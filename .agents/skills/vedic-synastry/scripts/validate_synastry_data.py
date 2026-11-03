#!/usr/bin/env python3
"""validate_synastry_data.py — 合盘跨盘计算前的轻量自检

校验两份 structured_data.md 是否满足合盘最低要求 + 盘内一致性。
复用 build_synastry_data.py 的解析器，不重复造轮子。

用法: python validate_synastry_data.py <A_structured_data.md> <B_structured_data.md>
退出码: 0 全通过 / 1 有硬性问题 / 2 参数错误
"""
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_synastry_data import Chart, PLANETS  # noqa: E402


def check_one(c):
    """返回 (硬性检查列表[(ok,msg)], 软警告列表[str])。"""
    issues = []
    n = len([p for p in PLANETS if p in c.planets])
    issues.append((n == 9, f"行星完整性 {n}/9"))
    issues.append((c.lagna_idx is not None, f"Lagna 解析 ({c.lagna_sign})"))
    # Ra-Ke 必须对宫（相差 6 星座）
    ra, ke = c.planets.get('Rahu'), c.planets.get('Ketu')
    if ra and ke and ra['sidx'] is not None and ke['sidx'] is not None:
        diff = (ra['sidx'] - ke['sidx']) % 12
        issues.append((diff == 6, f"Ra-Ke 对宫 (相差 {diff} 星座)"))
    else:
        issues.append((False, "Ra-Ke 解析失败"))
    issues.append((c.moon_nak is not None, f"Moon Nakshatra ({c.moon_nak} pada{c.moon_pada})"))

    # 软警告：缺失会触发对应层降级，但不阻塞
    warns = []
    if not c.ul:
        warns.append("UL 缺失 → UL/D9 承载层降级")
    if not c.dk:
        warns.append("DK 缺失 → 配偶指示层降级")
    if not c.dasha_md:
        warns.append("Dasha 当前状态缺失 → 时机层(Layer 3)降级")
    return issues, warns


def main():
    if len(sys.argv) < 3:
        print("用法: python validate_synastry_data.py <A.md> <B.md>")
        sys.exit(2)

    ok_all = True
    for label, path in (('A', sys.argv[1]), ('B', sys.argv[2])):
        if not os.path.exists(path):
            print(f"❌ 文件不存在: {path}")
            ok_all = False
            continue
        c = Chart(path, label)
        issues, warns = check_one(c)
        print(f"=== {label}: {os.path.basename(path)} ===")
        for ok, msg in issues:
            print(f"  {'✅' if ok else '❌'} {msg}")
            if not ok:
                ok_all = False
        for w in warns:
            print(f"  ⚠️  {w}")

    print("\n结果:", "✅ 通过，可运行 build_synastry_data.py"
          if ok_all else "❌ 存在硬性问题，先修复再合盘")
    sys.exit(0 if ok_all else 1)


if __name__ == '__main__':
    main()
