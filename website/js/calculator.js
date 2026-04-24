/* ══════════════════════════════════════════════
   VEDIC ASTROLOGY CALCULATOR (Sidereal)
   Pure JS · No External Dependencies
══════════════════════════════════════════════ */

/* ─── Constants ─── */
const RASHIS = [
  'Mesha (牡羊)','Vrishabha (金牛)','Mithuna (雙子)',
  'Kataka (巨蟹)','Simha (獅子)','Kanya (處女)',
  'Tula (天秤)','Vrishchika (天蠍)','Dhanu (射手)',
  'Makara (摩羯)','Kumbha (水瓶)','Meena (雙魚)',
];
const RASHIS_ZH = ['牡羊','金牛','雙子','巨蟹','獅子','處女','天秤','天蠍','射手','摩羯','水瓶','雙魚'];
const NAKSHATRAS = [
  'Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra',
  'Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni',
  'Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha',
  'Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishtha',
  'Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati',
];
const NAKSHATRA_LORDS = [
  'Ketu','Venus','Sun','Moon','Mars','Rahu',
  'Jupiter','Saturn','Mercury','Ketu','Venus','Sun',
  'Moon','Mars','Rahu','Jupiter','Saturn','Mercury',
  'Ketu','Venus','Sun','Moon','Mars','Rahu',
  'Jupiter','Saturn','Mercury',
];
const PLANET_GLYPHS = {
  Sun:'☉ 太陽', Moon:'☽ 月亮', Mars:'♂ 火星', Mercury:'☿ 水星',
  Jupiter:'♃ 木星', Venus:'♀ 金星', Saturn:'♄ 土星',
  Rahu:'☊ 北交點', Ketu:'☋ 南交點',
};
const DASHA_YEARS = { Ketu:7,Venus:20,Sun:6,Moon:10,Mars:7,Rahu:18,Jupiter:16,Saturn:19,Mercury:17 };
const DASHA_ORDER = ['Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury'];
const PLANET_COLORS = {
  Sun:'#f4a22d', Moon:'#c8d8f0', Mars:'#e84040', Mercury:'#4fd8a0',
  Jupiter:'#f0c040', Venus:'#f080c0', Saturn:'#a0b0c8',
  Rahu:'#c080e0', Ketu:'#80d0b0',
};

/* ─── Julian Day ─── */
function toJD(year, month, day, hour) {
  if (month <= 2) { year--; month += 12; }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) +
         Math.floor(30.6001 * (month + 1)) +
         day + hour / 24 + B - 1524.5;
}

/* ─── Sun Longitude (low-precision, ~1° accuracy) ─── */
function sunLongitude(jd) {
  const n = jd - 2451545.0;
  const L = (280.460 + 0.9856474 * n) % 360;
  const g = ((357.528 + 0.9856003 * n) % 360) * Math.PI / 180;
  const lam = L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g);
  return ((lam % 360) + 360) % 360;
}

/* ─── Moon Longitude (simplified, ~2° accuracy) ─── */
function moonLongitude(jd) {
  const T = (jd - 2451545.0) / 36525;
  let L0 = 218.3165 + 481267.8813 * T;
  const M  = (357.5291 + 35999.0503 * T) * Math.PI / 180;
  const Mp = (134.9634 + 477198.8676 * T) * Math.PI / 180;
  const F  = (93.2721  + 483202.0175 * T) * Math.PI / 180;
  const D  = (297.8502 + 445267.1115 * T) * Math.PI / 180;
  L0 += 6.2888 * Math.sin(Mp)
      + 1.2740 * Math.sin(2*D - Mp)
      + 0.6583 * Math.sin(2*D)
      + 0.2136 * Math.sin(2*Mp)
      - 0.1851 * Math.sin(M)
      - 0.1143 * Math.sin(2*F)
      + 0.0588 * Math.sin(2*D - 2*Mp)
      + 0.0572 * Math.sin(2*D - M - Mp)
      + 0.0533 * Math.sin(2*D + Mp);
  return ((L0 % 360) + 360) % 360;
}

/* ─── Planet Longitudes (very simplified) ─── */
function planetLongitudes(jd) {
  const T = (jd - 2451545.0) / 36525;
  // Mean longitudes (very simplified – for display only)
  return {
    Sun:     sunLongitude(jd),
    Moon:    moonLongitude(jd),
    Mars:    ((355.45 + 19141.696 * T) % 360 + 360) % 360,
    Mercury: ((252.25 + 149474.07 * T) % 360 + 360) % 360,
    Jupiter: ((34.40  + 3036.301 * T)  % 360 + 360) % 360,
    Venus:   ((181.98 + 58519.213 * T) % 360 + 360) % 360,
    Saturn:  ((50.08  + 1223.511 * T)  % 360 + 360) % 360,
    Rahu:    ((125.04 - 1934.136 * T)  % 360 + 360) % 360,
    Ketu:    ((305.04 - 1934.136 * T)  % 360 + 360) % 360,
  };
}

/* ─── Lahiri Ayanamsa ─── */
function ayanamsa(jd) {
  const T = (jd - 2451545.0) / 36525;
  return 23.85 + 0.013972 * T * 100; // simplified Lahiri
}

/* ─── Sidereal conversion ─── */
function toSidereal(tropical, jd) {
  const ayan = ayanamsa(jd);
  return ((tropical - ayan) % 360 + 360) % 360;
}

/* ─── Ascendant ─── */
function calcAscendant(jd, lat, lng, tz) {
  const T = (jd - 2451545.0) / 36525;
  const GMST = 6.697375 + 2400.0513369 * T + 0.0000258622 * T * T;
  const LST  = ((GMST + lng / 15) % 24 + 24) % 24;
  const LSTR = LST * 15 * Math.PI / 180;
  const epsilon = (23.4393 - 0.013004 * T) * Math.PI / 180;
  const latR  = lat * Math.PI / 180;
  const tanAsc = Math.cos(LSTR) / (-Math.sin(LSTR) * Math.cos(epsilon) - Math.tan(latR) * Math.sin(epsilon));
  let asc = Math.atan(tanAsc) * 180 / Math.PI;
  if (Math.cos(LSTR) < 0) asc += 180;
  asc = ((asc % 360) + 360) % 360;
  return toSidereal(asc, jd);
}

/* ─── Rashi / Degree helpers ─── */
function rashiIdx(lon) { return Math.floor(lon / 30) % 12; }
function degInRashi(lon) { return lon % 30; }
function nakshatraIdx(lon) { return Math.floor((lon / 360) * 27) % 27; }

/* ─── Nakshatra Pada ─── */
function pada(lon) { return Math.floor((lon % (360 / 27)) / (360 / 27 / 4)) + 1; }

/* ─── Dasha Calculator ─── */
function calcDasha(moonLon, birthDate) {
  const nkIdx   = nakshatraIdx(moonLon);
  const lord    = NAKSHATRA_LORDS[nkIdx];
  const nkDeg   = 360 / 27;
  const posInNk = moonLon % nkDeg;
  const fracRemaining = 1 - posInNk / nkDeg;

  const lordIdx = DASHA_ORDER.indexOf(lord);
  const firstYears = DASHA_YEARS[lord] * fracRemaining;

  const dashas = [];
  let date = new Date(birthDate);

  for (let i = 0; i < 9; i++) {
    const idx = (lordIdx + i) % 9;
    const pl  = DASHA_ORDER[idx];
    const yrs = i === 0 ? firstYears : DASHA_YEARS[pl];
    const start = new Date(date);
    const end   = new Date(date);
    end.setFullYear(end.getFullYear() + Math.floor(yrs));
    end.setMonth(end.getMonth() + Math.round((yrs % 1) * 12));
    dashas.push({ planet: pl, years: yrs, start, end });
    date = new Date(end);
  }
  return dashas;
}

/* ─── Current Dasha ─── */
function currentDasha(dashas) {
  const now = new Date();
  for (const d of dashas) {
    if (now >= d.start && now < d.end) return d;
  }
  return dashas[dashas.length - 1];
}

/* ─── Antar Dasha ─── */
function calcAntarDasha(mahaDasha, birthDate) {
  const lordIdx = DASHA_ORDER.indexOf(mahaDasha.planet);
  const total   = mahaDasha.years;
  const antars  = [];
  let date = new Date(mahaDasha.start);
  for (let i = 0; i < 9; i++) {
    const idx = (lordIdx + i) % 9;
    const pl  = DASHA_ORDER[idx];
    const yrs = (DASHA_YEARS[pl] / 120) * total;
    const start = new Date(date);
    const end   = new Date(date);
    end.setFullYear(end.getFullYear() + Math.floor(yrs));
    end.setMonth(end.getMonth() + Math.round((yrs % 1) * 12));
    antars.push({ planet: pl, years: yrs, start, end });
    date = new Date(end);
  }
  return antars;
}

/* ─── Format date ─── */
function fmt(d) {
  return d.toLocaleDateString('zh-TW', { year:'numeric', month:'short' });
}

/* ─── Retrograde check (simplified) ─── */
function isRetrograde(planet, jd) {
  const prev = planetLongitudes(jd - 1)[planet] || 0;
  const cur  = planetLongitudes(jd)[planet] || 0;
  const diff = cur - prev;
  if (planet === 'Sun' || planet === 'Moon') return false;
  return diff < 0 || diff > 180; // simplified
}

/* ─── Main Calculation ─── */
function calculate() {
  const dateVal = document.getElementById('birthDate').value;
  const timeVal = document.getElementById('birthTime').value;
  const lat     = parseFloat(document.getElementById('birthLat').value);
  const lng     = parseFloat(document.getElementById('birthLng').value);
  const tz      = parseFloat(document.getElementById('timezone').value);

  if (!dateVal || !timeVal || isNaN(lat) || isNaN(lng)) return;

  const [yr, mo, dy] = dateVal.split('-').map(Number);
  const [hr, mn]     = timeVal.split(':').map(Number);
  const utcHour = hr + mn / 60 - tz;
  const jd      = toJD(yr, mo, dy, utcHour);

  const tropicals = planetLongitudes(jd);
  const siderals  = {};
  for (const [k, v] of Object.entries(tropicals)) {
    siderals[k] = toSidereal(v, jd);
  }

  const asc     = calcAscendant(jd, lat, lng, tz);
  const moonLon = siderals.Moon;
  const dashas  = calcDasha(moonLon, new Date(`${dateVal}T${timeVal}`));
  const curDasha = currentDasha(dashas);
  const antars   = calcAntarDasha(curDasha, new Date(`${dateVal}T${timeVal}`));
  const curAntar = currentDasha(antars);

  const lagnaIdx   = rashiIdx(asc);
  const moonIdx    = rashiIdx(moonLon);
  const nkIdx      = nakshatraIdx(moonLon);
  const nkPada     = pada(moonLon);
  const sunIdx     = rashiIdx(siderals.Sun);

  renderResult({
    asc, lagnaIdx, moonLon, moonIdx, sunIdx,
    nkIdx, nkPada, siderals, dashas, curDasha, curAntar, jd,
  });
}

/* ─── Render Result ─── */
function renderResult(r) {
  const body = document.getElementById('resultBody');
  const wrap = document.getElementById('calcResult');
  if (!body || !wrap) return;

  // Core cards
  const coreCards = [
    { label:'上升星座 Lagna',   value: RASHIS_ZH[r.lagnaIdx],    sub: `${degInRashi(r.asc).toFixed(1)}° ${RASHIS[r.lagnaIdx]}` },
    { label:'月亮星座 Rashi',   value: RASHIS_ZH[r.moonIdx],     sub: `${degInRashi(r.moonLon).toFixed(1)}° · 吠陀核心` },
    { label:'太陽星座',          value: RASHIS_ZH[r.sunIdx],      sub: `${degInRashi(r.siderals.Sun).toFixed(1)}°` },
    { label:'月宿 Nakshatra',   value: NAKSHATRAS[r.nkIdx],      sub: `第 ${r.nkIdx+1} 宿 · 第 ${r.nkPada} 步 (Pada)` },
    { label:'月宿主星',          value: `${NAKSHATRA_LORDS[r.nkIdx]}`, sub: '大運起始行星' },
    { label:'Julian Day',       value: r.jd.toFixed(2),           sub: '天文儒略日' },
  ];

  // Planet table rows
  const planetOrder = ['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'];
  const tableRows = planetOrder.map(pl => {
    const lon = r.siderals[pl];
    const ri  = rashiIdx(lon);
    const deg = degInRashi(lon).toFixed(1);
    const nk  = NAKSHATRAS[nakshatraIdx(lon)];
    const retro = isRetrograde(pl, r.jd) ? ' ℞' : '';
    const color = PLANET_COLORS[pl] || '#c9a84c';
    return `<tr>
      <td><span style="color:${color}">${PLANET_GLYPHS[pl]}${retro}</span></td>
      <td>${RASHIS_ZH[ri]}</td>
      <td>${deg}°</td>
      <td>${nk}</td>
    </tr>`;
  });

  // Current Dasha box
  const dashaNext3 = r.dashas.slice(0, 4).map(d =>
    `<div style="display:flex;justify-content:space-between;font-size:.8rem;padding:.3rem 0;border-bottom:1px solid rgba(201,168,76,.1)">
      <span style="color:${PLANET_COLORS[d.planet]||'#c9a84c'}">${PLANET_GLYPHS[d.planet]}</span>
      <span style="color:var(--text-muted)">${fmt(d.start)} → ${fmt(d.end)}</span>
      <span style="color:var(--text-muted)">${d.years.toFixed(1)}年</span>
    </div>`
  ).join('');

  body.innerHTML = `
    <div class="result-grid">
      ${coreCards.map(c => `
        <div class="result-item">
          <div class="result-item-label">${c.label}</div>
          <div class="result-item-value">${c.value}</div>
          <div class="result-item-sub">${c.sub}</div>
        </div>
      `).join('')}
    </div>

    <div class="result-dasha-box">
      <h4>🔱 當前大運（Maha Dasha）</h4>
      <p>
        <span style="color:${PLANET_COLORS[r.curDasha.planet]||'#c9a84c'};font-size:1.1rem">${PLANET_GLYPHS[r.curDasha.planet]}</span>
        大運主星 &nbsp;·&nbsp;
        ${fmt(r.curDasha.start)} → ${fmt(r.curDasha.end)}
      </p>
      <p style="margin-top:.4rem">
        副星（Antar Dasha）：
        <span style="color:${PLANET_COLORS[r.curAntar.planet]||'#c9a84c'}">${PLANET_GLYPHS[r.curAntar.planet]}</span>
        &nbsp;${fmt(r.curAntar.start)} → ${fmt(r.curAntar.end)}
      </p>
    </div>

    <h4 style="font-family:Cinzel,serif;font-size:.9rem;color:var(--gold);margin-bottom:.8rem;letter-spacing:.1em">
      ◈ 九大行星位置
    </h4>
    <table class="result-planet-table">
      <thead>
        <tr>
          <th>行星 Graha</th>
          <th>星座 Rashi</th>
          <th>度數</th>
          <th>月宿 Nakshatra</th>
        </tr>
      </thead>
      <tbody>${tableRows.join('')}</tbody>
    </table>

    <h4 style="font-family:Cinzel,serif;font-size:.9rem;color:var(--gold);margin-bottom:.8rem;letter-spacing:.1em">
      ◈ 大運時序（近4期）
    </h4>
    <div style="background:rgba(201,168,76,.04);border:1px solid rgba(201,168,76,.15);border-radius:10px;padding:1rem 1.2rem;margin-bottom:1.5rem">
      ${dashaNext3}
    </div>

    <p style="font-size:.75rem;color:var(--text-muted);opacity:.6;text-align:center;line-height:1.8">
      ※ 此計算基於 Lahiri Ayanamsa 拉希里回歸差，使用簡化行星公式，僅供參考。<br>
      精確星盤請使用 Jagannatha Hora 等專業軟體生成 PDF 後進行完整審計。
    </p>
  `;

  wrap.style.display = 'block';
  wrap.scrollIntoView({ behavior:'smooth', block:'nearest' });
}

/* ─── Form Events ─── */
document.addEventListener('DOMContentLoaded', () => {
  const form   = document.getElementById('calcForm');
  const close  = document.getElementById('resultClose');
  const result = document.getElementById('calcResult');

  form && form.addEventListener('submit', e => {
    e.preventDefault();
    calculate();
  });

  close && close.addEventListener('click', () => {
    result.style.display = 'none';
  });

  // City quick-select chips
  document.querySelectorAll('.city-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.getElementById('birthLat').value = chip.dataset.lat;
      document.getElementById('birthLng').value = chip.dataset.lng;
      document.getElementById('timezone').value  = chip.dataset.tz;
      document.querySelectorAll('.city-chip').forEach(c => c.style.borderColor = '');
      chip.style.borderColor = 'var(--gold)';
      chip.style.color = 'var(--gold)';
    });
  });
});
