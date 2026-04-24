/* ══════════════════════════════════════════════
   PLANETS — Nine Planets (Navagraha) Data & Render
══════════════════════════════════════════════ */

const PLANETS = [
  {
    glyph: '☉', sa: 'SURYA', zh: '太陽',
    keywords: '靈魂・父親・權威・健康',
    color: '#f4a22d',
    rules: '獅子座', exalted: '牡羊座 10°', debilitated: '天秤座 10°',
    nature: '自然吉星（若不受剋）', themes: '身份認同、父親關係、領導力、政府機構、骨骼健康',
    karaka: '靈魂主星（Atmakaraka 候選）', dasha: '6 年',
    ashtakavarga: '最大48分', shadbala: '以太陽時力為主',
    desc: '太陽是自我意識的核心，代表靈魂的目的與父親的能量。在星盤中，太陽的強弱直接影響自信心、健康狀況與社會地位。太陽強旺帶來領導力與榮耀，受剋時顯示自我認同的困境。',
  },
  {
    glyph: '☽', sa: 'CHANDRA', zh: '月亮',
    keywords: '心智・母親・情感・直覺',
    color: '#c8d8f0',
    rules: '巨蟹座', exalted: '金牛座 3°', debilitated: '天蠍座 3°',
    nature: '自然吉星（月圓時）', themes: '情緒穩定性、母親關係、直覺力、家庭、液體、旅行',
    karaka: '心智主星 / 母親主星', dasha: '10 年',
    ashtakavarga: '最大49分', shadbala: '以月相力為主',
    desc: '月亮是吠陀占星中最重要的行星之一，代表心智與情感世界。月亮星座（Rashi）是個人性格的核心描述。月亮的相位影響情緒反應模式、與母親的關係，以及潛意識深處的需求。',
  },
  {
    glyph: '♂', sa: 'MANGAL', zh: '火星',
    keywords: '行動・兄弟・競爭・土地',
    color: '#e84040',
    rules: '牡羊座 / 天蠍座', exalted: '摩羯座 28°', debilitated: '巨蟹座 28°',
    nature: '自然凶星', themes: '勇氣、競爭力、土地財產、手術、兄弟、軍事、技術',
    karaka: '兄弟主星 / 土地主星', dasha: '7 年',
    ashtakavarga: '最大39分', shadbala: '以南方力為主',
    desc: '火星代表行動的能量與競爭的驅力。強旺的火星賦予無比的勇氣與執行力，但受剋的火星可能帶來衝動、意外或爭訟。火星與房產、兄弟關係密切相關，也象徵外科手術。',
  },
  {
    glyph: '☿', sa: 'BUDHA', zh: '水星',
    keywords: '智識・溝通・商業・技藝',
    color: '#4fd8a0',
    rules: '雙子座 / 處女座', exalted: '處女座 15°', debilitated: '雙魚座 15°',
    nature: '自然吉星（與吉星同宮時）', themes: '語言溝通、邏輯思維、商業貿易、寫作、數學、皮膚健康',
    karaka: '智識主星 / 話語主星', dasha: '17 年',
    ashtakavarga: '最大54分', shadbala: '以東方力為主',
    desc: '水星掌管智識的運作與語言溝通，是商業與分析思維的主宰。水星強旺的人邏輯清晰、表達能力強。水星是唯一會被染色的行星，容易受到同宮行星的影響。',
  },
  {
    glyph: '♃', sa: 'GURU', zh: '木星',
    keywords: '智慧・子女・宗教・擴展',
    color: '#f0c040',
    rules: '射手座 / 雙魚座', exalted: '巨蟹座 5°', debilitated: '摩羯座 5°',
    nature: '最大吉星', themes: '高等教育、宗教信仰、子女、財富、智慧、法律、老師',
    karaka: '子女主星 / 智慧主星', dasha: '16 年',
    ashtakavarga: '最大56分', shadbala: '以北方力為主',
    desc: '木星是九曜中最強大的自然吉星，象徵智慧、豐盛與精神成長。木星落座的宮位通常帶來擴展與保護。木星掌管子女、高等教育、宗教信仰與財富累積。',
  },
  {
    glyph: '♀', sa: 'SHUKRA', zh: '金星',
    keywords: '愛情・美麗・藝術・享樂',
    color: '#f080c0',
    rules: '金牛座 / 天秤座', exalted: '雙魚座 27°', debilitated: '處女座 27°',
    nature: '自然吉星', themes: '愛情婚姻、藝術美感、奢侈品、汽車、娛樂、腎臟健康',
    karaka: '伴侶主星（對男性）/ 婚姻主星', dasha: '20 年',
    ashtakavarga: '最大52分', shadbala: '以西方力為主',
    desc: '金星是美麗、藝術與愛情的象徵，也代表物質享受與感官愉悅。強旺的金星帶來魅力、藝術才華與豐裕的物質生活。金星的大運（20年）通常是人生中最享受的時期。',
  },
  {
    glyph: '♄', sa: 'SHANI', zh: '土星',
    keywords: '業力・紀律・限制・長壽',
    color: '#a0b0c8',
    rules: '摩羯座 / 水瓶座', exalted: '天秤座 20°', debilitated: '牡羊座 20°',
    nature: '最大凶星（自然）', themes: '業力審判、長壽、老年人、僕人、礦業、骨骼、慢性疾病',
    karaka: '長壽主星 / 業力主星', dasha: '19 年',
    ashtakavarga: '最大39分', shadbala: '以夜間力為主',
    desc: '土星是業力的執法者，代表限制、責任與時間的試煉。雖是自然凶星，但土星強旺且有利位置時賦予長壽、紀律與巨大的耐力。土星的大運（19年）是重大業力清算時期。',
  },
  {
    glyph: '☊', sa: 'RAHU', zh: '北交點',
    keywords: '執著・外來・革新・業力',
    color: '#c080e0',
    rules: '（無統治星座）', exalted: '金牛座 / 雙子座（爭議）', debilitated: '天蠍座 / 射手座（爭議）',
    nature: '影子行星（自然凶星）', themes: '世俗欲望、外來文化、科技、大眾媒體、突破常規、毒品',
    karaka: '業力累積的欲望面向', dasha: '18 年',
    ashtakavarga: '（無傳統分數）', shadbala: '以宮位與相位判斷',
    desc: 'Rahu（北交點）是業力上此生需要發展的方向，象徵強烈的執著與世俗欲望。Rahu 的影響通常帶來意想不到的機遇或混亂，它放大所在宮位的能量，使人對該領域有異乎尋常的渴望。',
  },
  {
    glyph: '☋', sa: 'KETU', zh: '南交點',
    keywords: '解脫・靈性・過去世・分離',
    color: '#80d0b0',
    rules: '（無統治星座）', exalted: '天蠍座 / 射手座（爭議）', debilitated: '金牛座 / 雙子座（爭議）',
    nature: '影子行星（自然凶星）', themes: '靈性修行、過去世記憶、分離、神秘學、解脫、外科技藝',
    karaka: '靈性主星 / 解脫主星 (Moksha)', dasha: '7 年',
    ashtakavarga: '（無傳統分數）', shadbala: '以宮位與相位判斷',
    desc: 'Ketu（南交點）代表過去世已完成的業力，象徵靈魂的舊有傾向。Ketu 所在之處通常帶來無執著感——擁有卻不在意。Ketu 與靈性修行、神秘學智慧深刻相連。',
  },
];

let activePlanetIdx = -1;

/* ── Orrery SVG ── */
function buildOrrery() {
  const wrap = document.getElementById('planetsOrrery');
  if (!wrap) return;

  const size = 320;
  const cx = size / 2, cy = size / 2;
  const orbits = [0, 55, 90, 120, 145, 168, 188, 205, 220];
  const glyphs = ['☉','☽','♂','☿','♃','♀','♄','☊','☋'];
  const colors = ['#f4a22d','#c8d8f0','#e84040','#4fd8a0','#f0c040','#f080c0','#a0b0c8','#c080e0','#80d0b0'];
  const speeds = [0, 0.9, 1.5, 2.1, 0.7, 1.2, 0.45, 0.3, 0.3];
  const startAngles = [0, 0.8, 2.1, 4.5, 1.2, 3.4, 5.1, 0.5, 3.7];

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.style.overflow = 'visible';

  // Orbit rings
  orbits.forEach((r, i) => {
    if (r === 0) return;
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', 'rgba(201,168,76,0.1)');
    circle.setAttribute('stroke-width', '0.7');
    circle.setAttribute('stroke-dasharray', '3 5');
    svg.appendChild(circle);
  });

  // Sun at centre
  const sunGlow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  sunGlow.setAttribute('cx', cx); sunGlow.setAttribute('cy', cy);
  sunGlow.setAttribute('r', '18');
  sunGlow.setAttribute('fill', 'rgba(244,162,45,0.15)');
  svg.appendChild(sunGlow);
  const sunText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  sunText.setAttribute('x', cx); sunText.setAttribute('y', cy + 6);
  sunText.setAttribute('text-anchor', 'middle');
  sunText.setAttribute('font-size', '18');
  sunText.textContent = '☉';
  sunText.style.fill = '#f4a22d';
  svg.appendChild(sunText);

  // Planet nodes (positions animated via JS)
  const planetNodes = [];
  glyphs.slice(1).forEach((g, i) => {
    const idx = i + 1;
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('class', 'orrery-planet');
    group.style.cursor = 'pointer';

    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('r', '10');
    dot.setAttribute('fill', colors[idx] + '22');
    dot.setAttribute('stroke', colors[idx]);
    dot.setAttribute('stroke-width', '1');

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('dominant-baseline', 'central');
    label.setAttribute('font-size', '11');
    label.style.fill = colors[idx];
    label.textContent = g;

    group.appendChild(dot);
    group.appendChild(label);
    svg.appendChild(group);
    planetNodes.push({ group, orbit: orbits[idx], speed: speeds[idx], angle: startAngles[idx] });
  });

  wrap.appendChild(svg);

  // Animate
  let lastT = 0;
  function animateOrrery(t) {
    const dt = (t - lastT) * 0.001;
    lastT = t;
    planetNodes.forEach(pn => {
      pn.angle += pn.speed * dt * 0.4;
      const x = cx + Math.cos(pn.angle) * pn.orbit;
      const y = cy + Math.sin(pn.angle) * pn.orbit;
      pn.group.setAttribute('transform', `translate(${x},${y})`);
    });
    requestAnimationFrame(animateOrrery);
  }
  requestAnimationFrame(animateOrrery);
}

/* ── Planet Cards ── */
function renderPlanets() {
  const grid = document.getElementById('planetsGrid');
  if (!grid) return;

  PLANETS.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'planet-card';
    card.innerHTML = `
      <span class="planet-glyph" style="color:${p.color};filter:drop-shadow(0 0 8px ${p.color}66)">${p.glyph}</span>
      <span class="planet-name-sa">${p.sa}</span>
      <span class="planet-name-zh">${p.zh}</span>
      <p class="planet-keywords">${p.keywords}</p>
    `;
    card.addEventListener('click', () => togglePlanetDetail(i, grid));
    grid.appendChild(card);
  });

  // Shared detail panel
  const detail = document.createElement('div');
  detail.className = 'planet-detail';
  detail.id = 'planetDetail';
  grid.appendChild(detail);
}

function togglePlanetDetail(idx, grid) {
  const cards = grid.querySelectorAll('.planet-card');
  const detail = document.getElementById('planetDetail');

  if (activePlanetIdx === idx) {
    detail.classList.remove('show');
    cards[idx].classList.remove('active');
    activePlanetIdx = -1;
    return;
  }
  if (activePlanetIdx >= 0) cards[activePlanetIdx].classList.remove('active');
  activePlanetIdx = idx;
  cards[idx].classList.add('active');

  const p = PLANETS[idx];
  detail.innerHTML = `
    <h3 style="color:${p.color};text-shadow:0 0 20px ${p.color}55">
      ${p.glyph} ${p.sa} · ${p.zh}
    </h3>
    <p style="color:var(--text-muted);font-size:.9rem;line-height:1.9;margin-bottom:1.2rem">${p.desc}</p>
    <div class="planet-detail-grid">
      <div class="planet-detail-item"><label>統治星座</label><span>${p.rules}</span></div>
      <div class="planet-detail-item"><label>擢升（Exalted）</label><span>${p.exalted}</span></div>
      <div class="planet-detail-item"><label>失勢（Debilitated）</label><span>${p.debilitated}</span></div>
      <div class="planet-detail-item"><label>本質（Nature）</label><span>${p.nature}</span></div>
      <div class="planet-detail-item"><label>Karaka 象徵</label><span>${p.karaka}</span></div>
      <div class="planet-detail-item"><label>大運年數（Dasha）</label><span>${p.dasha}</span></div>
      <div class="planet-detail-item"><label>Ashtakavarga</label><span>${p.ashtakavarga}</span></div>
      <div class="planet-detail-item"><label>Shadbala 六力</label><span>${p.shadbala}</span></div>
      <div class="planet-detail-item" style="grid-column:1/-1"><label>主要主題（Themes）</label><span>${p.themes}</span></div>
    </div>
  `;

  // Position detail panel below the clicked row
  const cols = getColumnsCount(grid);
  const row = Math.floor(idx / cols);
  const insertAfterIdx = Math.min((row + 1) * cols - 1, cards.length - 1);
  cards[insertAfterIdx].after(detail);
  detail.classList.add('show');
  detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function getColumnsCount(grid) {
  const style = window.getComputedStyle(grid);
  const cols = style.getPropertyValue('grid-template-columns').split(' ').length;
  return cols || 3;
}

document.addEventListener('DOMContentLoaded', () => {
  buildOrrery();
  renderPlanets();
});
