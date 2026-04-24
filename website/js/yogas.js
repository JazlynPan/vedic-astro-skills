/* ══════════════════════════════════════════════
   YOGAS — Special Planetary Combinations
══════════════════════════════════════════════ */

const YOGAS_DATA = [
  {
    name: 'Raj Yoga', icon: '👑', cat: 'power',
    type: '帝王瑜伽',
    desc: '由吉宮（Kendra 1/4/7/10）與三角宮（Trikona 1/5/9）的宮主星相互結合所形成的強大組合，賦予命盤持久的權力、地位與成就。',
    condition: '條件：吉宮宮主星與三角宮宮主星合相、互相相位或互換宮位。',
  },
  {
    name: 'Dhana Yoga', icon: '💰', cat: 'wealth',
    type: '財富瑜伽',
    desc: '財富宮（2、5、9、11宮）的宮主星相互結合，形成強大的財富累積能量。當這些行星彼此增強時，命盤主一生財富豐厚。',
    condition: '條件：第2、5、9、11宮宮主星之間相互合相或相位。',
  },
  {
    name: 'Gaja Kesari Yoga', icon: '🐘', cat: 'power',
    type: '象獅瑜伽',
    desc: '木星位於月亮的吉宮（1/4/7/10宮）時形成。象徵如大象般的力量與如獅子般的威嚴，賦予命盤主豐富的智慧、聲望與社會地位。',
    condition: '條件：木星位於月亮起算的第1、4、7、10宮。',
  },
  {
    name: 'Hamsa Yoga', icon: '🦢', cat: 'spiritual',
    type: '天鵝瑜伽（Pancha Mahapurusha）',
    desc: '木星位於摩羯座以外的自有星座或擢升星座，且在吉宮（1/4/7/10宮）。此人具有高貴品格、豐富智慧，身體勻稱，有宗教或哲學天賦。',
    condition: '條件：木星在巨蟹（擢升）、射手或雙魚（自有）且位於吉宮。',
  },
  {
    name: 'Malavya Yoga', icon: '🌸', cat: 'wealth',
    type: '金星吉祥瑜伽（Pancha Mahapurusha）',
    desc: '金星位於自有星座或擢升星座且在吉宮。此人擁有非凡的美貌、藝術天賦、物質享受能力，婚姻生活通常美滿幸福。',
    condition: '條件：金星在雙魚（擢升）、金牛或天秤（自有）且位於吉宮。',
  },
  {
    name: 'Ruchaka Yoga', icon: '⚔️', cat: 'power',
    type: '火星威武瑜伽（Pancha Mahapurusha）',
    desc: '火星位於自有星座或擢升星座且在吉宮。賦予命盤主強大的體魄、軍事才能、領導魄力，在競爭激烈的領域表現出眾。',
    condition: '條件：火星在摩羯（擢升）、牡羊或天蠍（自有）且位於吉宮。',
  },
  {
    name: 'Sasha Yoga', icon: '🪐', cat: 'power',
    type: '土星恩典瑜伽（Pancha Mahapurusha）',
    desc: '土星位於自有星座或擢升星座且在吉宮。賦予長壽、政治才能與對大眾的影響力。此人通常在晚年獲得最大的成就與認可。',
    condition: '條件：土星在天秤（擢升）、摩羯或水瓶（自有）且位於吉宮。',
  },
  {
    name: 'Bhadra Yoga', icon: '☿', cat: 'wealth',
    type: '水星吉祥瑜伽（Pancha Mahapurusha）',
    desc: '水星位於自有星座或擢升星座且在吉宮。賦予超強的智識能力、語言才華、商業頭腦與溝通魅力，在教育與商業領域特別突出。',
    condition: '條件：水星在處女（擢升/自有）或雙子（自有）且位於吉宮。',
  },
  {
    name: 'Neecha Bhanga Raja Yoga', icon: '🔄', cat: 'power',
    type: '失勢破解帝王瑜伽',
    desc: '當一顆行星處於失勢（Debilitation）狀態，但透過特定條件被「解除」，反而能形成強大的正面效應，帶來驚人的逆轉成功。',
    condition: '條件：失勢行星的主星位於吉宮，或失勢行星本身位於吉宮，或失勢行星受到擢升星的相位。',
  },
  {
    name: 'Viparita Raja Yoga', icon: '♻️', cat: 'power',
    type: '逆轉帝王瑜伽',
    desc: '凶宮（6/8/12宮）的宮主星相互交換或合相，反而形成強大的命運逆轉。此人能在極度困難的環境中異軍突起，在他人失敗之處成功。',
    condition: '條件：第6、8、12宮宮主星之間合相、互換或相位（且不影響吉宮）。',
  },
  {
    name: 'Chandra Mangala Yoga', icon: '🌙♂', cat: 'wealth',
    type: '月火財富瑜伽',
    desc: '月亮與火星的合相或強力相位。帶來強烈的商業直覺、財富積累能力與果斷的執行力。此人在資產投資與業務拓展上特別有天賦。',
    condition: '條件：月亮與火星合相，或火星相位月亮（第4、7、8相位）。',
  },
  {
    name: 'Saraswati Yoga', icon: '🎶', cat: 'spiritual',
    type: '辯才天女瑜伽',
    desc: '木星、水星、金星同時強旺（位於自有星座、擢升或吉宮）。賦予非凡的藝術才華、學術成就與精神洞察力。常見於傑出的藝術家、學者與精神導師。',
    condition: '條件：木星、水星、金星同時位於自有星座、擢升星座或吉宮（1/2/4/5/7/9/10宮）。',
  },
  {
    name: 'Parijata Yoga', icon: '🌺', cat: 'power',
    type: '聖樹瑜伽',
    desc: '上升星座的宮主星所在星座的主星，或上升星座宮主星的星座主星位於吉宮。此人晚年特別榮耀，受到廣泛的尊敬與認可。',
    condition: '條件：上升星座宮主星的擢升/自有星座主星，位於吉宮或自身強旺。',
  },
  {
    name: 'Lakshmi Yoga', icon: '🪷', cat: 'wealth',
    type: '財富女神瑜伽',
    desc: '第9宮（幸運宮）的宮主星強旺（位於自有星座或擢升），且同時位於吉宮，形成帶來極大財富與幸運的罕見組合。',
    condition: '條件：第9宮宮主星位於自有星座或擢升，且在吉宮（1/4/7/10）。',
  },
  {
    name: 'Kemadruma Yoga', icon: '⚠️', cat: 'power',
    type: '孤立月亮（凶）',
    desc: '月亮兩側（第2宮與第12宮）均無行星，且月亮本身未受到任何行星的相位。此組合可能帶來孤獨感、情緒不穩定，但若其他行星強旺可緩解。',
    condition: '條件：月亮兩側無行星（第2、12宮空宮），且月亮未受任何行星相位。',
  },
  {
    name: 'Kala Sarpa Yoga', icon: '🐍', cat: 'spiritual',
    type: '時間之蛇瑜伽',
    desc: '所有行星（不含 Rahu/Ketu）均位於 Rahu 至 Ketu 的半圓範圍內。此組合帶來強烈的業力主題，可能造成重大的人生挑戰或特殊使命感。',
    condition: '條件：太陽、月亮、火星、水星、木星、金星、土星全部位於 Rahu 到 Ketu 的一側。',
  },
  {
    name: 'Budha-Aditya Yoga', icon: '☉☿', cat: 'wealth',
    type: '日水聰明瑜伽',
    desc: '太陽與水星合相（且水星不過度受剋）。賦予敏銳的智識、清晰的溝通能力與管理才幹，在需要專業知識的領域特別突出。',
    condition: '條件：太陽與水星合相，且水星與太陽角距在3°–12°之間（避免過度焦傷）。',
  },
  {
    name: 'Dhan Yoga (11H)', icon: '💎', cat: 'wealth',
    type: '第11宮財富瑜伽',
    desc: '第11宮（收益宮）的宮主星強旺，且與第2宮（財富宮）或第9宮（幸運宮）的宮主星產生有利聯繫，帶來源源不絕的財富收益。',
    condition: '條件：第11宮宮主星強旺，且與第2或第9宮宮主星合相/相位/互換。',
  },
  {
    name: 'Mahabhagya Yoga', icon: '⭐', cat: 'power',
    type: '大幸運瑜伽',
    desc: '男命：白天出生（太陽在地平線上），太陽、月亮、上升星座均在奇數星座。女命：夜間出生，太陽、月亮、上升均在偶數星座。帶來卓越的命運。',
    condition: '條件：男命白天奇數/女命夜間偶數，太陽+月亮+上升星座符合性別對應。',
  },
  {
    name: 'Amala Yoga', icon: '✨', cat: 'spiritual',
    type: '純淨瑜伽',
    desc: '第10宮中只有自然吉星（木星、金星、水星或月亮在強旺狀態），不受任何自然凶星的相位。帶來高尚的品格、良好的聲譽與崇高的社會形象。',
    condition: '條件：第10宮僅有自然吉星且無凶星相位（從上升或月亮計算）。',
  },
  {
    name: 'Vasumati Yoga', icon: '🌟', cat: 'wealth',
    type: '財富天神瑜伽',
    desc: '所有自然吉星（木星、金星、水星、月亮）均位於上升星座起算的第3、6、10或11宮（Upachaya 宮位）。帶來持續增長的財富與成就。',
    condition: '條件：木星、金星、水星、月亮全部位於第3、6、10、11宮中。',
  },
  {
    name: 'Chandra-Adhi Yoga', icon: '🌙✨', cat: 'power',
    type: '月亮支柱瑜伽',
    desc: '自然吉星（木星、金星、水星）全部或多數位於月亮起算的第6、7、8宮。賦予命盤主傑出的管理才能、誠實的品格，成為環境中的重要支柱人物。',
    condition: '條件：木星、金星、水星位於月亮起算的第6、7、8宮（至少三顆）。',
  },
  {
    name: 'Kedar Yoga', icon: '🏔️', cat: 'spiritual',
    type: '山嶽瑜伽',
    desc: '當九大行星分布在四個星座中。此組合帶來穩定、耕耘大地的能量，命盤主善於農業、不動產，熱愛自然，在固定事業上能持續累積。',
    condition: '條件：九大行星分布恰好在4個星座中（不多不少）。',
  },
  {
    name: 'Parvata Yoga', icon: '⛰️', cat: 'power',
    type: '巨山瑜伽',
    desc: '吉星在吉宮而凶星在凶宮（6/8/12），且第6宮和第8宮宮主星不在吉宮。此人地位崇高，如山嶽般穩固，受到廣泛的尊重與財富。',
    condition: '條件：吉星佔據吉宮，凶星位於凶宮，且凶宮主星不在吉宮中。',
  },
];

function buildYogasGrid() {
  const grid = document.getElementById('yogasGrid');
  if (!grid) return;

  YOGAS_DATA.forEach(yoga => {
    const card = document.createElement('div');
    card.className = 'yoga-card';
    card.dataset.cat = yoga.cat;
    card.innerHTML = `
      <div class="yoga-card-head">
        <div class="yoga-icon">${yoga.icon}</div>
        <div>
          <div class="yoga-name">${yoga.name}</div>
          <div class="yoga-type">${yoga.type}</div>
        </div>
      </div>
      <p class="yoga-desc">${yoga.desc}</p>
      <div class="yoga-condition"><strong>⟐ </strong>${yoga.condition}</div>
    `;
    grid.appendChild(card);
  });

  // Filter buttons
  document.querySelectorAll('.yoga-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.yoga-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      document.querySelectorAll('.yoga-card').forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', buildYogasGrid);
