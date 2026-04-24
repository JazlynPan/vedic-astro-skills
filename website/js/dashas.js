/* ══════════════════════════════════════════════
   DASHAS — Vimshottari 120-Year Timeline
══════════════════════════════════════════════ */

const DASHAS = [
  {
    planet: 'Ketu',   glyph: '☋', years: 7,  color: '#80d0b0',
    theme: '靈性覺醒、業力清算、分離與放下、過去世記憶浮現',
    qualities: '神秘、隔離、靈性修行、舊事終結',
    positive: '靈性智慧、神秘學天賦、解脫傾向',
    challenging: '困惑、分離、健康隱患、無方向感',
  },
  {
    planet: 'Venus',  glyph: '♀', years: 20, color: '#f080c0',
    theme: '愛情、藝術、物質享受與美麗繁榮的黃金時期',
    qualities: '享樂、創意、魅力、財富、感官滿足',
    positive: '美麗財富、愛情婚姻、藝術成就、生活品質',
    challenging: '縱欲放蕩、感情糾葛、奢侈消費',
  },
  {
    planet: 'Sun',    glyph: '☉', years: 6,  color: '#f4a22d',
    theme: '自我認同建立、權力地位、父親業力與領導力考驗',
    qualities: '領導、榮耀、權威、健康、個人目標',
    positive: '職位晉升、聲譽建立、政府助力',
    challenging: '自我膨脹、父親問題、健康挑戰',
  },
  {
    planet: 'Moon',   glyph: '☽', years: 10, color: '#c8d8f0',
    theme: '情感世界、母親業力、心智波動與內在需求探索',
    qualities: '情感、直覺、家庭、旅行、心智',
    positive: '情感豐富、直覺敏銳、家庭幸福',
    challenging: '情緒波動、心理壓力、母親問題',
  },
  {
    planet: 'Mars',   glyph: '♂', years: 7,  color: '#e84040',
    theme: '行動執行、競爭挑戰、土地財產與兄弟業力期',
    qualities: '行動、勇氣、競爭、土地、技術',
    positive: '事業推進、體能強健、土地房產獲益',
    challenging: '衝突爭訟、意外傷害、過度衝動',
  },
  {
    planet: 'Rahu',   glyph: '☊', years: 18, color: '#c080e0',
    theme: '世俗欲望爆發、業力執著、外來影響與突破性變化',
    qualities: '執著、創新、外來、科技、突破',
    positive: '突破障礙、科技成就、外來機遇',
    challenging: '混亂困惑、執念陷阱、不穩定',
  },
  {
    planet: 'Jupiter',glyph: '♃', years: 16, color: '#f0c040',
    theme: '智慧擴展、財富豐盛、精神成長與子女吉祥時期',
    qualities: '智慧、豐盛、宗教、教育、子女',
    positive: '財富積累、地位提升、精神豐盛',
    challenging: '過度樂觀、膨脹不實際、宗教偏執',
  },
  {
    planet: 'Saturn', glyph: '♄', years: 19, color: '#a0b0c8',
    theme: '業力考驗、紀律磨練、長期累積與生命深層轉化',
    qualities: '紀律、責任、限制、長壽、業力',
    positive: '紮實基礎、長期成就、業力清償',
    challenging: '阻礙延遲、孤獨困頓、健康磨耗',
  },
  {
    planet: 'Mercury',glyph: '☿', years: 17, color: '#4fd8a0',
    theme: '智識商業、溝通創新、學習分析與社交網絡繁榮期',
    qualities: '智識、溝通、商業、分析、學習',
    positive: '商業成功、智識成就、溝通流暢',
    challenging: '過度分析、神經緊張、計畫未落實',
  },
];

function buildDashaTimeline() {
  const container = document.getElementById('dashaTimeline');
  if (!container) return;

  const totalYears = DASHAS.reduce((s, d) => s + d.years, 0); // 120

  DASHAS.forEach((d, i) => {
    const pct = ((d.years / totalYears) * 100).toFixed(1);
    const item = document.createElement('div');
    item.className = 'dasha-item';
    item.dataset.idx = i;
    item.innerHTML = `
      <div class="dasha-planet" style="filter:drop-shadow(0 0 8px ${d.color}66)">${d.glyph}</div>
      <div class="dasha-info">
        <div class="dasha-name" style="color:${d.color}">${d.planet} Maha Dasha</div>
        <div class="dasha-years">${d.years} 年週期</div>
        <div class="dasha-theme">${d.theme}</div>
      </div>
      <div class="dasha-bar-wrap">
        <div class="dasha-bar-bg">
          <div class="dasha-bar-fill" style="width:0%;background:linear-gradient(90deg,${d.color}88,${d.color})"></div>
        </div>
        <div class="dasha-bar-label">${pct}%</div>
      </div>
    `;

    // Expand on click
    item.addEventListener('click', () => toggleDashaDetail(item, d));
    container.appendChild(item);
  });

  // Animate bars when section is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        container.querySelectorAll('.dasha-bar-fill').forEach((bar, i) => {
          const pct = ((DASHAS[i].years / totalYears) * 100).toFixed(1);
          setTimeout(() => { bar.style.width = pct + '%'; }, i * 80);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(container);
}

let activeDashaItem = null;
let activeDashaDetail = null;

function toggleDashaDetail(item, d) {
  if (activeDashaItem === item) {
    // collapse
    if (activeDashaDetail) activeDashaDetail.remove();
    activeDashaItem = null;
    activeDashaDetail = null;
    return;
  }
  if (activeDashaDetail) activeDashaDetail.remove();

  const detail = document.createElement('div');
  detail.style.cssText = `
    background: rgba(201,168,76,.05);
    border: 1px solid ${d.color}44;
    border-radius: 12px;
    padding: 1.2rem 1.5rem;
    margin: 0.5rem 0 0.5rem 2rem;
    animation: fadeSlideIn .35s ease;
    font-size: .86rem;
    color: var(--text-muted);
    line-height: 1.8;
  `;
  detail.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:.8rem;margin-bottom:.6rem">
      <div>
        <span style="font-size:.65rem;letter-spacing:.14em;color:${d.color};display:block;margin-bottom:.15rem">✦ 吉祥主題</span>
        <span>${d.positive}</span>
      </div>
      <div>
        <span style="font-size:.65rem;letter-spacing:.14em;color:#e08080;display:block;margin-bottom:.15rem">⚠ 挑戰面向</span>
        <span>${d.challenging}</span>
      </div>
    </div>
    <div>
      <span style="font-size:.65rem;letter-spacing:.14em;color:${d.color};display:block;margin-bottom:.15rem">◈ 核心特質</span>
      <span>${d.qualities}</span>
    </div>
  `;

  item.after(detail);
  activeDashaItem = item;
  activeDashaDetail = detail;
}

document.addEventListener('DOMContentLoaded', buildDashaTimeline);
