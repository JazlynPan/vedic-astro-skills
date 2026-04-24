/* ══════════════════════════════════════════════
   HOUSES — Twelve Bhavas
══════════════════════════════════════════════ */

const HOUSES = [
  {
    num: 1, name: '上升宮', sa: 'Lagna / Tanu Bhava',
    type: 'kendra', typeLabel: '吉宮 Kendra',
    emoji: '🔱',
    keywords: ['自我', '外貌', '健康', '性格', '出生'],
    desc: '第1宮是整個星盤的核心，代表自我意識、外在形象、身體健康與此生的主要性格。上升星座（Lagna）決定了整個星盤的宮位分配。同時也是三角宮（Trikona），具有雙重重要性。',
    color: '#c9a84c',
  },
  {
    num: 2, name: '財富宮', sa: 'Dhana Bhava',
    type: 'neutral', typeLabel: '中性宮',
    emoji: '💰',
    keywords: ['財富', '家族', '飲食', '語言', '右眼'],
    desc: '第2宮代表個人財富的積累、家族資源、飲食習慣與語言表達。強旺的第2宮及其宮主星帶來豐裕的物質資源與雄辯的口才。',
    color: '#e0c040',
  },
  {
    num: 3, name: '兄弟宮', sa: 'Sahaja Bhava',
    type: 'upachaya', typeLabel: '增長宮 Upachaya',
    emoji: '🤝',
    keywords: ['兄弟', '溝通', '勇氣', '短途旅行', '技藝'],
    desc: '第3宮象徵兄弟姊妹、短途旅行、溝通技巧、勇氣與個人努力。這是主動爭取所需的宮位。強旺的第3宮帶來溝通才華與勇敢的行動力。',
    color: '#e06020',
  },
  {
    num: 4, name: '家庭宮', sa: 'Sukha / Matru Bhava',
    type: 'kendra', typeLabel: '吉宮 Kendra',
    emoji: '🏡',
    keywords: ['家庭', '母親', '房產', '教育', '幸福'],
    desc: '第4宮代表家庭生活、母親、房產土地、基礎教育與內心的幸福感。強旺的第4宮帶來穩定的家庭環境與豐厚的不動產。是快樂與內心平靜的宮位。',
    color: '#60c080',
  },
  {
    num: 5, name: '子女宮', sa: 'Putra / Vidya Bhava',
    type: 'trikona', typeLabel: '三角宮 Trikona',
    emoji: '👶',
    keywords: ['子女', '智識', '創意', '投機', '前世'],
    desc: '第5宮是吉祥的三角宮，象徵子女、智識、創造力、愛情、投機（股票）與前世功德。這是才能與靈感的宮位，強旺帶來優秀的子女與出眾的智識能力。',
    color: '#f0c040',
  },
  {
    num: 6, name: '疾病宮', sa: 'Shatru / Roga Bhava',
    type: 'dusthana', typeLabel: '凶宮 Dusthana',
    emoji: '⚔️',
    keywords: ['敵人', '疾病', '債務', '服務', '競爭'],
    desc: '第6宮是凶宮之一，象徵敵人、疾病、債務、法律糾紛與日常服務工作。然而在增長宮（Upachaya）的概念下，強旺的第6宮也代表克服敵人、戰勝疾病的能力。',
    color: '#e04040',
  },
  {
    num: 7, name: '婚姻宮', sa: 'Kalatra / Yuvati Bhava',
    type: 'kendra', typeLabel: '吉宮 Kendra',
    emoji: '💍',
    keywords: ['婚姻', '伴侶', '合夥', '外交', '貿易'],
    desc: '第7宮是婚姻與合夥的宮位，代表配偶、商業合夥人、公開的敵人（對面位置）與外交關係。強旺的第7宮帶來幸福的婚姻與成功的合作關係。',
    color: '#f080c0',
  },
  {
    num: 8, name: '死亡宮', sa: 'Ayu / Randhra Bhava',
    type: 'dusthana', typeLabel: '凶宮 Dusthana',
    emoji: '🔮',
    keywords: ['壽命', '遺產', '神秘', '轉化', '突變'],
    desc: '第8宮是神秘力量的宮位，象徵死亡、壽命長短、遺產繼承、神秘學、深層轉化與他人的錢財。雖是凶宮，強旺的第8宮賦予深刻的研究能力與神秘智慧。',
    color: '#8060c0',
  },
  {
    num: 9, name: '幸運宮', sa: 'Dharma / Bhagya Bhava',
    type: 'trikona', typeLabel: '三角宮 Trikona',
    emoji: '🌟',
    keywords: ['幸運', '父親', '宗教', '長途旅行', '高等教育'],
    desc: '第9宮是最吉祥的宮位之一，象徵幸運、父親、宗教信仰、哲學、高等教育與長途旅行。這是業力福報的宮位，強旺帶來源源不絕的好運與精神指引。',
    color: '#c0a020',
  },
  {
    num: 10, name: '事業宮', sa: 'Karma / Rajya Bhava',
    type: 'kendra', typeLabel: '吉宮 Kendra',
    emoji: '👑',
    keywords: ['事業', '地位', '成就', '政府', '聲譽'],
    desc: '第10宮是事業與社會地位的核心宮位，象徵職業、成就、名聲、與政府的關係。這是行動與業力（Karma）的宮位，強旺帶來卓越的社會地位與令人矚目的事業成就。',
    color: '#40a0e0',
  },
  {
    num: 11, name: '收益宮', sa: 'Labha / Aya Bhava',
    type: 'upachaya', typeLabel: '增長宮 Upachaya',
    emoji: '💫',
    keywords: ['收益', '朋友', '願望', '社群', '長兄'],
    desc: '第11宮是願望實現與收益的宮位，象徵財富流入、朋友圈、社群關係與長期目標的達成。強旺的第11宮帶來廣泛的人脈網絡與持續的財富積累。',
    color: '#80e0c0',
  },
  {
    num: 12, name: '損失宮', sa: 'Vyaya / Antya Bhava',
    type: 'dusthana', typeLabel: '凶宮 Dusthana',
    emoji: '🌌',
    keywords: ['損失', '解脫', '國外', '靈性', '睡眠'],
    desc: '第12宮代表損失、隔離、國外定居、靈性解脫（Moksha）與潛意識的深層。雖是凶宮，但強旺的第12宮賦予深刻的靈性修行能力與超脫世俗的智慧。',
    color: '#a060c8',
  },
];

function buildHousesWheel() {
  const wrap = document.getElementById('housesWheel');
  const panel = document.getElementById('houseInfoPanel');
  if (!wrap) return;

  const size = Math.min(wrap.clientWidth || 440, 440);
  const cx = size / 2, cy = size / 2;
  const outerR = size * 0.48;
  const innerR = outerR * 0.32;
  const total = 12;
  const slice = (Math.PI * 2) / total;
  const startAngle = -Math.PI / 2;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);

  HOUSES.forEach((h, i) => {
    const a0 = startAngle + i * slice;
    const a1 = a0 + slice;
    const midAngle = a0 + slice / 2;
    const labelR = (outerR + innerR) / 2;

    // Sector path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const x1 = cx + Math.cos(a0) * outerR, y1 = cy + Math.sin(a0) * outerR;
    const x2 = cx + Math.cos(a1) * outerR, y2 = cy + Math.sin(a1) * outerR;
    const ix1 = cx + Math.cos(a0) * innerR, iy1 = cy + Math.sin(a0) * innerR;
    const ix2 = cx + Math.cos(a1) * innerR, iy2 = cy + Math.sin(a1) * innerR;
    const d = [
      `M ${ix1} ${iy1}`,
      `L ${x1} ${y1}`,
      `A ${outerR} ${outerR} 0 0 1 ${x2} ${y2}`,
      `L ${ix2} ${iy2}`,
      `A ${innerR} ${innerR} 0 0 0 ${ix1} ${iy1}`,
      'Z'
    ].join(' ');
    path.setAttribute('d', d);
    path.setAttribute('fill', h.color + '18');
    path.setAttribute('stroke', h.color + '40');
    path.setAttribute('stroke-width', '1');
    path.setAttribute('class', 'house-segment');
    path.style.cursor = 'pointer';
    path.style.transition = 'fill .3s ease';

    // House number
    const numText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    numText.setAttribute('x', cx + Math.cos(midAngle) * labelR);
    numText.setAttribute('y', cy + Math.sin(midAngle) * labelR + 5);
    numText.setAttribute('text-anchor', 'middle');
    numText.setAttribute('font-family', 'Cinzel, serif');
    numText.setAttribute('font-size', size > 380 ? '13' : '11');
    numText.setAttribute('fill', h.color);
    numText.setAttribute('font-weight', '700');
    numText.textContent = h.num;

    // Emoji icon
    const emojiText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    emojiText.setAttribute('x', cx + Math.cos(midAngle) * labelR);
    emojiText.setAttribute('y', cy + Math.sin(midAngle) * labelR - (size > 380 ? 12 : 10));
    emojiText.setAttribute('text-anchor', 'middle');
    emojiText.setAttribute('font-size', size > 380 ? '12' : '10');
    emojiText.textContent = h.emoji;

    // Interaction
    const handleClick = () => {
      // Reset all
      svg.querySelectorAll('.house-segment').forEach(s => {
        s.style.fill = HOUSES[parseInt(s.dataset.idx)].color + '18';
        s.setAttribute('stroke-width', '1');
      });
      path.style.fill = h.color + '40';
      path.setAttribute('stroke-width', '2');
      showHouseInfo(h);
      panel.classList.add('active');
    };

    path.addEventListener('click', handleClick);
    numText.addEventListener('click', handleClick);
    emojiText.addEventListener('click', handleClick);
    path.dataset.idx = i;

    svg.appendChild(path);
    svg.appendChild(emojiText);
    svg.appendChild(numText);
  });

  // Centre circle
  const centre = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  centre.setAttribute('cx', cx); centre.setAttribute('cy', cy);
  centre.setAttribute('r', innerR);
  centre.setAttribute('fill', 'rgba(10,6,20,0.95)');
  centre.setAttribute('stroke', 'rgba(201,168,76,0.4)');
  centre.setAttribute('stroke-width', '1.5');
  svg.appendChild(centre);

  const centreText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  centreText.setAttribute('x', cx); centreText.setAttribute('y', cy - 8);
  centreText.setAttribute('text-anchor', 'middle');
  centreText.setAttribute('font-size', '20');
  centreText.textContent = '🔱';
  svg.appendChild(centreText);

  const centreLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  centreLabel.setAttribute('x', cx); centreLabel.setAttribute('y', cy + 16);
  centreLabel.setAttribute('text-anchor', 'middle');
  centreLabel.setAttribute('font-family', 'Cinzel, serif');
  centreLabel.setAttribute('font-size', '9');
  centreLabel.setAttribute('fill', 'rgba(201,168,76,0.5)');
  centreLabel.textContent = '12 BHAVAS';
  svg.appendChild(centreLabel);

  wrap.appendChild(svg);
}

function showHouseInfo(h) {
  const panel = document.getElementById('houseInfoPanel');
  if (!panel) return;
  panel.innerHTML = `
    <div class="house-info-num" style="color:${h.color}">${h.num}</div>
    <div class="house-info-name">${h.name} ${h.emoji}</div>
    <div class="house-info-sa">${h.sa}</div>
    <span class="house-info-type ${h.type}">${h.typeLabel}</span>
    <p class="house-info-desc">${h.desc}</p>
    <div class="house-info-keywords">
      ${h.keywords.map(k => `<span class="house-kw">${k}</span>`).join('')}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', buildHousesWheel);
