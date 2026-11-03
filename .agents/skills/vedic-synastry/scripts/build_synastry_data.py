#!/usr/bin/env python3
"""build_synastry_data.py — 合盘跨盘计算引擎

读两份 structured_data.md → 输出 synastry_data.md（只存可复核的计算，不存解释）。
纯标准库；体系：KN Rao / Parashari；判据见 resources/aspect-policy.md。

用法:
    python build_synastry_data.py <A_structured_data.md> <B_structured_data.md> <out_dir> [--a 名A] [--b 名B]

输出: <out_dir>/synastry_data.md
"""
import re
import os
import argparse

SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
         'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
SIGN_IDX = {s: i for i, s in enumerate(SIGNS)}
SIGN_ABBR = {'Ar': 0, 'Ta': 1, 'Ge': 2, 'Cn': 3, 'Le': 4, 'Vi': 5,
             'Li': 6, 'Sc': 7, 'Sg': 8, 'Cp': 9, 'Aq': 10, 'Pi': 11}
PLANETS = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu']
KEY_POINTS = ['Lagna', 'Moon', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Rahu', 'Ketu']

# Graha Drishti 特殊视相（除全员 7th 对宫外的额外宫位，从所在宫起算）
SPECIAL_DRISHTI = {'Mars': [4, 8], 'Jupiter': [5, 9], 'Saturn': [3, 10]}
BENEFICS = {'Jupiter', 'Venus', 'Moon', 'Mercury'}
MALEFICS = {'Saturn', 'Mars', 'Rahu', 'Ketu', 'Sun'}

# 尊贵度英文枚举 → 中文（真实 calc 输出英文，data_contract 文档写中文）
DIGNITY_CN = {
    'exalted': '入旺', 'debilitated': '落陷', 'own': '入庙', 'moolatrikona': '自境',
    'great_friend': '至友', 'friend': '友方', 'neutral': '中性',
    'enemy': '敌方', 'great_enemy': '死敌',
}

# 行星自然友敌（标准 Parashari），用于 Graha Maitri
NATURAL = {
    'Sun':     {'friend': {'Moon', 'Mars', 'Jupiter'}, 'enemy': {'Venus', 'Saturn'}},
    'Moon':    {'friend': {'Sun', 'Mercury'}, 'enemy': set()},
    'Mars':    {'friend': {'Sun', 'Moon', 'Jupiter'}, 'enemy': {'Mercury'}},
    'Mercury': {'friend': {'Sun', 'Venus'}, 'enemy': {'Moon'}},
    'Jupiter': {'friend': {'Sun', 'Moon', 'Mars'}, 'enemy': {'Mercury', 'Venus'}},
    'Venus':   {'friend': {'Mercury', 'Saturn'}, 'enemy': {'Sun', 'Moon'}},
    'Saturn':  {'friend': {'Mercury', 'Venus'}, 'enemy': {'Sun', 'Moon', 'Mars'}},
}
SIGN_LORDS = {
    'Aries': 'Mars', 'Taurus': 'Venus', 'Gemini': 'Mercury', 'Cancer': 'Moon',
    'Leo': 'Sun', 'Virgo': 'Mercury', 'Libra': 'Venus', 'Scorpio': 'Mars',
    'Sagittarius': 'Jupiter', 'Capricorn': 'Saturn', 'Aquarius': 'Saturn', 'Pisces': 'Jupiter'
}

# 27 Nakshatra（规范顺序）→ Gana / Nadi（表小且可靠，先实现这两项 + Graha Maitri + Bhakoot）
NAKSHATRAS = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu',
    'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta',
    'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
    'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
    'Uttara Bhadrapada', 'Revati'
]
GANA = {  # Deva / Manushya / Rakshasa
    'Deva': {'Ashwini', 'Mrigashira', 'Punarvasu', 'Pushya', 'Hasta', 'Swati',
             'Anuradha', 'Shravana', 'Revati'},
    'Manushya': {'Bharani', 'Rohini', 'Ardra', 'Purva Phalguni', 'Uttara Phalguni',
                 'Purva Ashadha', 'Uttara Ashadha', 'Purva Bhadrapada', 'Uttara Bhadrapada'},
    'Rakshasa': {'Krittika', 'Ashlesha', 'Magha', 'Chitra', 'Vishakha', 'Jyeshtha',
                 'Mula', 'Dhanishta', 'Shatabhisha'},
}
NADI = {  # Adi / Madhya / Antya
    'Adi': {'Ashwini', 'Ardra', 'Punarvasu', 'Uttara Phalguni', 'Hasta', 'Jyeshtha',
            'Mula', 'Shatabhisha', 'Purva Bhadrapada'},
    'Madhya': {'Bharani', 'Mrigashira', 'Pushya', 'Purva Phalguni', 'Chitra', 'Anuradha',
               'Purva Ashadha', 'Dhanishta', 'Uttara Bhadrapada'},
    'Antya': {'Krittika', 'Rohini', 'Ashlesha', 'Magha', 'Swati', 'Vishakha',
              'Uttara Ashadha', 'Shravana', 'Revati'},
}

# Varna（按元素：水=Brahmin>火=Kshatriya>土=Vaishya>风=Shudra）
_VARNA = {'Brahmin': {'Cancer', 'Scorpio', 'Pisces'}, 'Kshatriya': {'Aries', 'Leo', 'Sagittarius'},
          'Vaishya': {'Taurus', 'Virgo', 'Capricorn'}, 'Shudra': {'Gemini', 'Libra', 'Aquarius'}}
VARNA_OF = {s: v for v, ss in _VARNA.items() for s in ss}

# Vashya（整星座近似分组）
VASHYA_OF = {
    'Aries': 'Quad', 'Taurus': 'Quad', 'Sagittarius': 'Quad', 'Capricorn': 'Quad',
    'Gemini': 'Human', 'Virgo': 'Human', 'Libra': 'Human', 'Aquarius': 'Human',
    'Cancer': 'Water', 'Pisces': 'Water', 'Leo': 'Wild', 'Scorpio': 'Insect',
}

# Yoni（Nakshatra → 动物符号）+ 天敌对（评分0=制约）
NAK_YONI = {
    'Ashwini': 'Horse', 'Bharani': 'Elephant', 'Krittika': 'Goat', 'Rohini': 'Snake',
    'Mrigashira': 'Snake', 'Ardra': 'Dog', 'Punarvasu': 'Cat', 'Pushya': 'Goat',
    'Ashlesha': 'Cat', 'Magha': 'Rat', 'Purva Phalguni': 'Rat', 'Uttara Phalguni': 'Cow',
    'Hasta': 'Buffalo', 'Chitra': 'Tiger', 'Swati': 'Buffalo', 'Vishakha': 'Tiger',
    'Anuradha': 'Deer', 'Jyeshtha': 'Deer', 'Mula': 'Dog', 'Purva Ashadha': 'Monkey',
    'Uttara Ashadha': 'Mongoose', 'Shravana': 'Monkey', 'Dhanishta': 'Lion',
    'Shatabhisha': 'Horse', 'Purva Bhadrapada': 'Lion', 'Uttara Bhadrapada': 'Cow', 'Revati': 'Elephant',
}
YONI_BITTER = {frozenset(p) for p in [
    ('Cow', 'Tiger'), ('Elephant', 'Lion'), ('Horse', 'Buffalo'),
    ('Dog', 'Deer'), ('Snake', 'Mongoose'), ('Cat', 'Rat'), ('Monkey', 'Goat'),
]}


def sign_index(s):
    """星座名/缩写 → 0-11 索引，容错前3字母匹配。"""
    if not s:
        return None
    s = s.strip()
    if s in SIGN_IDX:
        return SIGN_IDX[s]
    if s in SIGN_ABBR:
        return SIGN_ABBR[s]
    for full, i in SIGN_IDX.items():
        if full.lower().startswith(s.lower()[:3]):
            return i
    return None


def norm_nak(name):
    """Nakshatra 名规范化匹配（容拼写差异），返回规范名或 None。"""
    if not name:
        return None
    n = re.sub(r'[^a-z]', '', name.lower())
    for std in NAKSHATRAS:
        if re.sub(r'[^a-z]', '', std.lower()) == n:
            return std
    # 前6字母兜底
    for std in NAKSHATRAS:
        if re.sub(r'[^a-z]', '', std.lower())[:6] == n[:6]:
            return std
    return None


def gana_of(nak):
    for g, members in GANA.items():
        if nak in members:
            return g
    return None


def nadi_of(nak):
    for nd, members in NADI.items():
        if nak in members:
            return nd
    return None


class Chart:
    """解析一份 structured_data.md，提取合盘所需字段。"""

    def __init__(self, path, label):
        self.label = label
        with open(path, encoding='utf-8') as f:
            self.text = f.read()
        self.planets = {}       # name -> {sign, sidx, house, lon(绝对黄经), retro}
        self.lagna_sign = None
        self.lagna_idx = None
        self.moon_nak = None
        self.moon_pada = None
        self.ul = None          # {sign, sidx, house}
        self.dk = None          # 行星名
        self.house_lords = {}   # house(int) -> {'lord':..,'lord_house':..}
        self.dignity = {}       # planet -> compound 复合尊贵度
        self.dasha_md = None    # {'planet','start','end'}
        self.dasha_ad = None    # {'planet','start','end'} (small 'A-B')
        self._parse()

    def _deg_to_lon(self, sidx, deg_str):
        m = re.search(r"(\d+)\D+(\d+)", deg_str)
        if not m or sidx is None:
            return None
        d, mi = int(m.group(1)), int(m.group(2))
        return sidx * 30 + d + mi / 60.0

    def _parse(self):
        t = self.text
        # 行星位置: | Name | Sign | House | deg°min' | D/R |
        for m in re.finditer(
                r"^\|\s*(\w+)\s*\|\s*([A-Za-z]+)\s*\|\s*(\d+)\s*\|\s*([\d°'\".\s]+?)\s*\|\s*([DR—\-]+)\s*\|",
                t, re.M):
            name, sign, house, deg_str, retro = m.groups()
            if name == 'Lagna':
                self.lagna_sign = sign
                self.lagna_idx = sign_index(sign)
            if name in PLANETS or name == 'Lagna':
                sidx = sign_index(sign)
                self.planets[name] = {
                    'sign': sign, 'sidx': sidx, 'house': int(house),
                    'lon': self._deg_to_lon(sidx, deg_str),
                    'retro': retro.strip() == 'R',
                }
        # Nakshatra 表: | Moon | Nak | Pada | Lord |  → 取 Moon
        for m in re.finditer(r"^\|\s*Moon\s*\|\s*([A-Za-z ]+?)\s*\|\s*(\d)\s*\|", t, re.M):
            nk = norm_nak(m.group(1))
            if nk:
                self.moon_nak = nk
                self.moon_pada = int(m.group(2))
                break
        # 特殊点位 UL: | UL (Upapada Lagna) | Sign | House | ... |
        m = re.search(r"\|\s*UL[^|]*\|\s*([A-Za-z]+)\s*\|\s*(\d+)\s*\|", t)
        if m:
            si = sign_index(m.group(1))
            self.ul = {'sign': m.group(1), 'sidx': si, 'house': int(m.group(2))}
        # DK = Planet（7K主用）
        m = re.search(r"DK\s*=\s*([A-Za-z]+)", t)
        if m:
            self.dk = m.group(1)
        # 宫主表: | h | domain | lord | lord_house |
        for m in re.finditer(r"^\|\s*(\d{1,2})\s*\|\s*[^|]+\|\s*([A-Za-z]+)\s*\|\s*(\d+)\s*\|", t, re.M):
            h = int(m.group(1))
            if 1 <= h <= 12 and h not in self.house_lords:
                self.house_lords[h] = {'lord': m.group(2), 'lord_house': int(m.group(3))}
        # 尊贵度: | Planet | Sign | Lord | Compound | |
        for m in re.finditer(
                r"^\|\s*(Sun|Moon|Mars|Mercury|Jupiter|Venus|Saturn)\s*\|\s*[A-Za-z]+\s*\|\s*[A-Za-z]+\s*\|\s*([^|]+?)\s*\|",
                t, re.M):
            self.dignity[m.group(1)] = m.group(2).strip()
        # Dasha 当前状态
        m = re.search(r"Mahadasha:\s*([A-Za-z]+)\s*\(([^)]+)\)", t)
        if m:
            span = [x.strip() for x in m.group(2).split('~')]
            self.dasha_md = {'planet': m.group(1), 'start': span[0], 'end': span[-1]}
        m = re.search(r"Antardasha:\s*([A-Za-z]+)-([A-Za-z]+)\s*\(([^)]+)\)", t)
        if m:
            span = [x.strip() for x in m.group(3).split('~')]
            self.dasha_ad = {'planet': m.group(2), 'md': m.group(1),
                             'start': span[0], 'end': span[-1]}

    # —— 便捷访问 ——
    def dignity_of(self, planet):
        v = self.dignity.get(planet, '—')
        return DIGNITY_CN.get(v, v)

    def role_of(self, planet):
        """该行星在本盘掌管哪些宫（P1 角色判定的原料）。"""
        houses = [h for h, info in self.house_lords.items() if info['lord'] == planet]
        return houses


def house_from(sidx, lagna_idx):
    """星座索引相对某 Lagna 的宫位（1-12）。"""
    if sidx is None or lagna_idx is None:
        return None
    return ((sidx - lagna_idx) % 12) + 1


# ========== 跨盘计算 ==========

def overlay(src, dst):
    """src 的行星落入 dst 的宫位（方向：src → dst）。"""
    rows = []
    for name in PLANETS:
        p = src.planets.get(name)
        if not p:
            continue
        h = house_from(p['sidx'], dst.lagna_idx)
        rows.append({'planet': name, 'sign': p['sign'], 'house_in_dst': h,
                     'dignity': src.dignity_of(name), 'roles': src.role_of(name)})
    return rows


def cross_aspects(a, b):
    """A 行星与 B 行星的跨盘接触：整宫合相/对宫 + Graha Drishti + 度数 orb 标注。"""
    out = []
    for an in PLANETS:
        ap = a.planets.get(an)
        if not ap or ap['sidx'] is None:
            continue
        for bn in PLANETS:
            bp = b.planets.get(bn)
            if not bp or bp['sidx'] is None:
                continue
            rel = ap['sidx'] - bp['sidx']
            gap = rel % 12
            kind = None
            if gap == 0:
                kind = '合相(同座)'
            elif gap == 6:
                kind = '对宫(对冲)'
            if kind:
                orb_tag = ''
                if ap['lon'] is not None and bp['lon'] is not None:
                    diff = abs(ap['lon'] - bp['lon']) % 360
                    if diff > 180:
                        diff = 360 - diff
                    base = 0 if gap == 0 else 180
                    od = abs(diff - base)
                    lum = an in ('Sun', 'Moon') or bn in ('Sun', 'Moon')
                    tight = 7 if lum else 5
                    tier = '紧密' if od < tight else ('一般' if od < 12 else '整宫')
                    od_d, od_m = int(od), int(round((od - int(od)) * 60))
                    orb_tag = f"{od_d}°{od_m:02d}'[{tier}]"
                out.append({'a': an, 'b': bn, 'kind': kind, 'orb': orb_tag,
                            'dir': 'A↔B'})
    return out


def same_house_resonance(a, b):
    """双方各自把同一行星放在相同宫位（共鸣特征，如双方 Venus 都在 H6）。"""
    rows = []
    for p in PLANETS:
        pa, pb = a.planets.get(p), b.planets.get(p)
        if pa and pb and pa['house'] == pb['house']:
            rows.append({'planet': p, 'house': pa['house']})
    return rows


def drishti_to_points(src, dst):
    """src 行星的 Graha Drishti 是否命中 dst 的关键点位（Lagna/Moon/Venus/...）。"""
    hits = []
    # dst 关键点位在 dst 盘的星座索引
    dst_points = {}
    if dst.lagna_idx is not None:
        dst_points['Lagna'] = dst.lagna_idx
    for kp in ['Moon', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Rahu', 'Ketu']:
        if kp in dst.planets and dst.planets[kp]['sidx'] is not None:
            dst_points[kp] = dst.planets[kp]['sidx']
    if dst.ul:
        dst_points['UL'] = dst.ul['sidx']
    for an in PLANETS:
        ap = src.planets.get(an)
        if not ap or ap['sidx'] is None:
            continue
        # src 行星落在 dst 盘的星座 = ap['sidx']；视相目标星座（整宫，从所在星座算）
        aspects = [7] + SPECIAL_DRISHTI.get(an, [])
        target_signs = {(ap['sidx'] + (asp - 1)) % 12 for asp in aspects}
        for pt, psidx in dst_points.items():
            if psidx in target_signs:
                nature = '吉' if an in BENEFICS else '凶'
                hits.append({'a': an, 'point': pt, 'nature': nature,
                             'dignity': src.dignity_of(an)})
    return hits


def key_point_interactions(a, b):
    """关键点位的双向交互摘要：A 的点位落入 B 的宫 + 与 B 点位的关系。"""
    rows = []
    for kp in KEY_POINTS + ['UL', 'DK']:
        if kp == 'UL':
            ap = a.ul
            sidx = ap['sidx'] if ap else None
        elif kp == 'DK':
            dk = a.dk
            ap = a.planets.get(dk) if dk else None
            sidx = ap['sidx'] if ap else None
        elif kp == 'Lagna':
            sidx = a.lagna_idx
        else:
            ap = a.planets.get(kp)
            sidx = ap['sidx'] if ap else None
        if sidx is None:
            continue
        h = house_from(sidx, b.lagna_idx)
        label = kp if kp != 'DK' else f'DK({a.dk})'
        rows.append({'point': label, 'house_in_b': h})
    return rows


def ashtakoota(a, b):
    """Ashtakoota 八项 → 档位 + 现代维度。KN Rao 态度：只筛查不裁决，不给 X/36。
    全部基于双方 Moon 的星座 + Nakshatra（structured_data 已有）。"""
    am = a.planets.get('Moon')
    bm = b.planets.get('Moon')
    if not (am and bm):
        return []
    asign, bsign = am['sign'], bm['sign']
    anak, bnak = a.moon_nak, b.moon_nak
    out = []

    def add(item, tier, dim):
        out.append({'item': item, 'tier': tier, 'dim': dim})

    # Varna（不做高低裁决，只看同层）
    va, vb = VARNA_OF.get(asign), VARNA_OF.get(bsign)
    if va and vb:
        add('Varna', '支持(同层)' if va == vb else '中性', '心智友好度')
    # Vashya
    wa, wb = VASHYA_OF.get(asign), VASHYA_OF.get(bsign)
    if wa and wb:
        add('Vashya', '支持(同组)' if wa == wb else '中性', '吸引方向')
    # Tara（双向计数，余 3/5/7 不吉）
    if anak in NAKSHATRAS and bnak in NAKSHATRAS:
        ai, bi = NAKSHATRAS.index(anak), NAKSHATRAS.index(bnak)

        def ausp(frm, to):
            return (((to - frm) % 27) + 1) % 9 not in (3, 5, 7)
        t1, t2 = ausp(ai, bi), ausp(bi, ai)
        add('Tara', '支持' if (t1 and t2) else ('制约' if not (t1 or t2) else '中性'), '关系稳定度')
    # Yoni
    ya, yb = NAK_YONI.get(anak), NAK_YONI.get(bnak)
    if ya and yb:
        if ya == yb:
            tier = '支持(同)'
        elif frozenset({ya, yb}) in YONI_BITTER:
            tier = '制约(天敌)'
        else:
            tier = '中性'
        add('Yoni', tier, '身体亲密风格')
    # Graha Maitri（双方 Moon 星座主自然关系）
    la, lb = SIGN_LORDS.get(asign), SIGN_LORDS.get(bsign)
    if la and lb:
        if la == lb:
            tier = '支持(同主)'
        else:
            a_f = lb in NATURAL.get(la, {}).get('friend', set())
            b_f = la in NATURAL.get(lb, {}).get('friend', set())
            a_e = lb in NATURAL.get(la, {}).get('enemy', set())
            b_e = la in NATURAL.get(lb, {}).get('enemy', set())
            if a_f and b_f:
                tier = '支持(互友)'
            elif a_e or b_e:
                tier = '制约(含敌)'
            else:
                tier = '中性'
        add('Graha Maitri', tier, '心智/精神契合')
    # Gana
    ga, gb = gana_of(anak), gana_of(bnak)
    if ga and gb:
        if ga == gb:
            tier = f'支持(同{ga})'
        elif 'Rakshasa' in (ga, gb):
            tier = f'制约({ga}×{gb})'
        else:
            tier = f'中性({ga}×{gb})'
        add('Gana', tier, '气质与冲突')
    # Bhakoot（双方 Moon 星座相对位置）
    rel = (bm['sidx'] - am['sidx']) % 12 + 1
    if rel in (6, 8, 2, 12, 5, 9):
        tier = f'制约(相对{rel} dosha)'
    elif rel in (1, 7, 3, 11):
        tier = f'支持(相对{rel})'
    else:
        tier = f'中性(相对{rel})'
    add('Bhakoot', tier, '情绪节奏/家庭')
    # Nadi
    na, nb = nadi_of(anak), nadi_of(bnak)
    if na and nb:
        add('Nadi', '制约(同Nadi dosha)' if na == nb else f'支持(异Nadi {na}/{nb})', '深层兼容')
    return out


def dasha_overlap(a, b):
    """双方当前 MD/AD + 主星交集线索（时机层原料）。"""
    lines = []
    if a.dasha_md:
        ad = f" / AD {a.dasha_ad['planet']}" if a.dasha_ad else ''
        lines.append(f"{a.label}: MD {a.dasha_md['planet']} ({a.dasha_md['start']}~{a.dasha_md['end']}){ad}")
    if b.dasha_md:
        ad = f" / AD {b.dasha_ad['planet']}" if b.dasha_ad else ''
        lines.append(f"{b.label}: MD {b.dasha_md['planet']} ({b.dasha_md['start']}~{b.dasha_md['end']}){ad}")
    # 主星交集：一方 Dasha 主星是否触发另一方关键点位
    notes = []
    for src, dst, tag in ((a, b, f"{a.label}→{b.label}"), (b, a, f"{b.label}→{a.label}")):
        for lvl in ('dasha_md', 'dasha_ad'):
            d = getattr(src, lvl)
            if not d:
                continue
            pl = d['planet']
            p = src.planets.get(pl)
            if p and dst.lagna_idx is not None:
                h = house_from(p['sidx'], dst.lagna_idx)
                if h in (1, 5, 7, 8, 11):
                    notes.append(f"{tag}: {pl}({lvl[-2:].upper()}) 落对方 {h} 宫（关系相关）")
    return lines, notes


# ========== 输出 ==========

def build(a, b):
    L = []
    L.append("# synastry_data.md（跨盘计算结果，只存计算不存解释）\n")
    L.append(f"- A = {a.label}（Lagna {a.lagna_sign}）")
    L.append(f"- B = {b.label}（Lagna {b.lagna_sign}）")
    L.append(f"- A Moon: {a.moon_nak} pada{a.moon_pada} | B Moon: {b.moon_nak} pada{b.moon_pada}")
    L.append(f"- A UL: {a.ul['sign'] if a.ul else '—'} | A DK: {a.dk or '—'}")
    L.append(f"- B UL: {b.ul['sign'] if b.ul else '—'} | B DK: {b.dk or '—'}\n")

    L.append("## 1. 月宿筛查（Ashtakoota 八项，仅筛查不裁决）\n")
    ks = ashtakoota(a, b)
    if ks:
        L.append("| Koota | 档位 | 现代维度 |")
        L.append("|-------|------|---------|")
        for r in ks:
            L.append(f"| {r['item']} | {r['tier']} | {r['dim']} |")
        L.append("> dosha 不否决，承载力以 Layer 0/2/3 为准，详见 koota-policy.md\n")
    else:
        L.append("（缺 Moon Nakshatra/星座，月宿层不可用）\n")

    L.append(f"## 2. 落宫：A({a.label}) 行星 → B 宫位\n")
    L.append("| A行星 | 星座 | 落入B宫 | A自盘尊贵 | A掌管宫 |")
    L.append("|-------|------|--------|----------|--------|")
    for r in overlay(a, b):
        L.append(f"| {r['planet']} | {r['sign']} | {r['house_in_dst']} | {r['dignity']} | {r['roles'] or '—'} |")
    L.append("")
    L.append(f"## 3. 落宫：B({b.label}) 行星 → A 宫位\n")
    L.append("| B行星 | 星座 | 落入A宫 | B自盘尊贵 | B掌管宫 |")
    L.append("|-------|------|--------|----------|--------|")
    for r in overlay(b, a):
        L.append(f"| {r['planet']} | {r['sign']} | {r['house_in_dst']} | {r['dignity']} | {r['roles'] or '—'} |")
    L.append("")

    L.append("## 4. 跨盘相位（整宫合相/对宫 + 度数标注）\n")
    ca = cross_aspects(a, b)
    if ca:
        L.append("| A行星 | B行星 | 关系 | 度数 |")
        L.append("|-------|-------|------|------|")
        for r in ca:
            L.append(f"| {r['a']} | {r['b']} | {r['kind']} | {r['orb']} |")
    L.append("")

    L.append("## 4b. 同宫共鸣（双方各自把同一行星放在相同宫位）\n")
    res = same_house_resonance(a, b)
    if res:
        L.append("| 行星 | 双方共同宫位 |")
        L.append("|------|------------|")
        for r in res:
            L.append(f"| {r['planet']} | {r['house']} |")
    else:
        L.append("（无）")
    L.append("")

    L.append("## 5. Graha Drishti 命中对方关键点位\n")
    L.append(f"### {a.label} 行星视相 → {b.label} 点位")
    L.append("| A行星 | 命中B点位 | 吉凶 | A尊贵 |")
    L.append("|-------|-----------|------|-------|")
    for r in drishti_to_points(a, b):
        L.append(f"| {r['a']} | {r['point']} | {r['nature']} | {r['dignity']} |")
    L.append("")
    L.append(f"### {b.label} 行星视相 → {a.label} 点位")
    L.append("| B行星 | 命中A点位 | 吉凶 | B尊贵 |")
    L.append("|-------|-----------|------|-------|")
    for r in drishti_to_points(b, a):
        L.append(f"| {r['a']} | {r['point']} | {r['nature']} | {r['dignity']} |")
    L.append("")

    L.append("## 6. 关键点位落宫\n")
    L.append(f"### {a.label} 点位 → B 宫位")
    L.append("| 点位 | 落入B宫 |")
    L.append("|------|--------|")
    for r in key_point_interactions(a, b):
        L.append(f"| {r['point']} | {r['house_in_b']} |")
    L.append("")
    L.append(f"### {b.label} 点位 → A 宫位")
    L.append("| 点位 | 落入A宫 |")
    L.append("|------|--------|")
    for r in key_point_interactions(b, a):
        L.append(f"| {r['point']} | {r['house_in_b']} |")
    L.append("")

    L.append("## 7. Dasha 时机原料\n")
    lines, notes = dasha_overlap(a, b)
    for ln in lines:
        L.append(f"- {ln}")
    if notes:
        L.append("\n触发线索：")
        for n in notes:
            L.append(f"- {n}")
    L.append("")

    L.append("## 8. 置信度\n")
    L.append(f"- A 行星解析: {len([p for p in PLANETS if p in a.planets])}/9 | "
             f"B 行星解析: {len([p for p in PLANETS if p in b.planets])}/9")
    L.append(f"- A Moon宿: {'有' if a.moon_nak else '缺'} | B Moon宿: {'有' if b.moon_nak else '缺'}")
    L.append("- 解读时以 D1 方向叠盘 > UL·DK > D9 > Dasha > 月宿 为权重（interpretation-rubric.md）")
    return '\n'.join(L)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('a_path')
    ap.add_argument('b_path')
    ap.add_argument('out_dir')
    ap.add_argument('--a', default='A')
    ap.add_argument('--b', default='B')
    args = ap.parse_args()

    a = Chart(args.a_path, args.a)
    b = Chart(args.b_path, args.b)
    md = build(a, b)
    os.makedirs(args.out_dir, exist_ok=True)
    out = os.path.join(args.out_dir, 'synastry_data.md')
    with open(out, 'w', encoding='utf-8') as f:
        f.write(md)
    print(f"[ok] {out}")
    print(f"  A={args.a} planets {len([p for p in PLANETS if p in a.planets])}/9, "
          f"B={args.b} planets {len([p for p in PLANETS if p in b.planets])}/9")


if __name__ == '__main__':
    main()
