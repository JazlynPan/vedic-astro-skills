/* ══════════════════════════════════════════════
   NAKSHATRAS — 27 Lunar Mansions
══════════════════════════════════════════════ */

const NAKSHATRAS_DATA = [
  {
    num: 1, name: 'Ashwini', sa: 'अश्विनी', meaning: '馬頭·治癒者',
    lord: 'Ketu', lordGlyph: '☋', deity: 'Ashwini Kumars（雙馬神）',
    symbol: '🐎', rashi: '牡羊 0°–13°20\'',
    desc: 'Ashwini 是星宿之始，象徵新的開始、療癒能量與迅速行動。Ashwini Kumars 是天界的醫師，賦予此宿強大的療癒天賦與開拓精神。',
    qualities: '快速・療癒・勇氣・先驅', guna: 'Rajas', gender: '男性',
    color: '#e0a040', pada: ['牡羊', '金牛', '雙子', '巨蟹'],
  },
  {
    num: 2, name: 'Bharani', sa: 'भरणी', meaning: '承載者',
    lord: 'Venus', lordGlyph: '♀', deity: 'Yama（死神）',
    symbol: '🪐', rashi: '牡羊 13°20\'–26°40\'',
    desc: 'Bharani 受金星統治，象徵創造與毀滅的循環。此宿與業力清算、生命的誕生與死亡密切相連，賦予強大的意志力與創造衝動。',
    qualities: '業力・轉化・生命力・堅毅', guna: 'Rajas', gender: '女性',
    color: '#c84060', pada: ['獅子', '處女', '天秤', '天蠍'],
  },
  {
    num: 3, name: 'Krittika', sa: 'कृत्तिका', meaning: '切割者',
    lord: 'Sun', lordGlyph: '☉', deity: 'Agni（火神）',
    symbol: '🔥', rashi: '牡羊 26°40\'–金牛 10°',
    desc: 'Krittika 由太陽統治，火神 Agni 掌管。象徵鋒利的辨別力、熱情與勇氣。此宿有強烈的批判眼光與軍事才能，但也帶來攻擊性。',
    qualities: '火焰・辨別・領導・果決', guna: 'Rajas', gender: '女性',
    color: '#f06020', pada: ['射手', '摩羯', '水瓶', '雙魚'],
  },
  {
    num: 4, name: 'Rohini', sa: 'रोहिणी', meaning: '紅色的·生長者',
    lord: 'Moon', lordGlyph: '☽', deity: 'Brahma（創造神）',
    symbol: '🐂', rashi: '金牛 10°–23°20\'',
    desc: 'Rohini 是月亮最喜愛的居所，象徵豐饒、美麗與物質繁榮。此宿的人天生具有磁力般的吸引力，對藝術、音樂與奢華有高度品味。',
    qualities: '豐饒・美麗・感性・創造', guna: 'Rajas', gender: '女性',
    color: '#e06080', pada: ['牡羊', '金牛', '雙子', '巨蟹'],
  },
  {
    num: 5, name: 'Mrigashira', sa: 'मृगशिरा', meaning: '鹿頭',
    lord: 'Mars', lordGlyph: '♂', deity: 'Soma（月神）',
    symbol: '🦌', rashi: '金牛 23°20\'–雙子 6°40\'',
    desc: 'Mrigashira 象徵永恆的探索與追尋。如同鹿的天性，此宿的人充滿好奇心，不斷在物質或精神領域尋找滿足，具有強烈的感官享樂傾向。',
    qualities: '探索・感性・溫柔・好奇', guna: 'Tamas', gender: '中性',
    color: '#60b060', pada: ['獅子', '處女', '天秤', '天蠍'],
  },
  {
    num: 6, name: 'Ardra', sa: 'आर्द्रा', meaning: '濕潤的·暴風',
    lord: 'Rahu', lordGlyph: '☊', deity: 'Rudra（暴風神）',
    symbol: '💧', rashi: '雙子 6°40\'–20°',
    desc: 'Ardra 受 Rahu 統治，Rudra 暴風神掌管。象徵破壞之後的淨化與新生。此宿帶來強烈的心智能量、情緒劇烈波動，以及對舊有結構的摧毀與重建。',
    qualities: '暴風・轉化・智識・強烈', guna: 'Tamas', gender: '女性',
    color: '#4080c0', pada: ['射手', '摩羯', '水瓶', '雙魚'],
  },
  {
    num: 7, name: 'Punarvasu', sa: 'पुनर्वसु', meaning: '重返光明',
    lord: 'Jupiter', lordGlyph: '♃', deity: 'Aditi（無限女神）',
    symbol: '🏹', rashi: '雙子 20°–巨蟹 3°20\'',
    desc: 'Punarvasu 象徵更新、希望與慷慨。如同箭矢返回，此宿代表復原力與樂觀精神。受木星統治，此宿的人慷慨、哲學性強，有強烈的靈性傾向。',
    qualities: '更新・慷慨・智慧・樂觀', guna: 'Sattva', gender: '男性',
    color: '#f0c040', pada: ['牡羊', '金牛', '雙子', '巨蟹'],
  },
  {
    num: 8, name: 'Pushya', sa: 'पुष्य', meaning: '滋養者',
    lord: 'Saturn', lordGlyph: '♄', deity: 'Brihaspati（木星神）',
    symbol: '🌼', rashi: '巨蟹 3°20\'–16°40\'',
    desc: 'Pushya 被稱為星宿之王，象徵滋養、慈悲與靈性滋育。此宿的人天生具有照顧他人的本能，有強烈的家庭觀念與傳統價值，也帶來財富與尊嚴。',
    qualities: '滋養・慈悲・傳統・繁榮', guna: 'Tamas', gender: '男性',
    color: '#80c8a0', pada: ['獅子', '處女', '天秤', '天蠍'],
  },
  {
    num: 9, name: 'Ashlesha', sa: 'आश्लेषा', meaning: '纏繞者',
    lord: 'Mercury', lordGlyph: '☿', deity: 'Naga（蛇神）',
    symbol: '🐍', rashi: '巨蟹 16°40\'–30°',
    desc: 'Ashlesha 是蛇的星宿，象徵昆達里尼能量、神秘智慧與魅惑力。此宿的人擁有洞察人心的能力，但也可能帶來操縱傾向。強烈的直覺與心靈感應能力。',
    qualities: '神秘・洞察・魅力・蛻變', guna: 'Sattva', gender: '女性',
    color: '#608060', pada: ['射手', '摩羯', '水瓶', '雙魚'],
  },
  {
    num: 10, name: 'Magha', sa: 'मघा', meaning: '偉大者',
    lord: 'Ketu', lordGlyph: '☋', deity: 'Pitrs（祖先靈）',
    symbol: '👑', rashi: '獅子 0°–13°20\'',
    desc: 'Magha 象徵王權、傳承與祖先的業力。此宿的人有強烈的家族使命感，傾向於繼承或建立傳統。具有天然的領導氣質與對榮耀的渴望。',
    qualities: '王權・傳承・榮耀・祖先', guna: 'Tamas', gender: '女性',
    color: '#c09040', pada: ['牡羊', '金牛', '雙子', '巨蟹'],
  },
  {
    num: 11, name: 'Purva Phalguni', sa: 'पूर्व फाल्गुनी', meaning: '前紅星',
    lord: 'Venus', lordGlyph: '♀', deity: 'Bhaga（財富神）',
    symbol: '🛋️', rashi: '獅子 13°20\'–26°40\'',
    desc: 'Purva Phalguni 象徵享樂、創造力與放鬆。受金星統治，此宿的人熱愛藝術、音樂與感官享受，具有強烈的表演慾和迷人魅力，帶來財富與愉悅。',
    qualities: '享樂・創意・魅力・休憩', guna: 'Rajas', gender: '女性',
    color: '#e08040', pada: ['獅子', '處女', '天秤', '天蠍'],
  },
  {
    num: 12, name: 'Uttara Phalguni', sa: 'उत्तर फाल्गुनी', meaning: '後紅星',
    lord: 'Sun', lordGlyph: '☉', deity: 'Aryaman（慷慨之神）',
    symbol: '🛏️', rashi: '獅子 26°40\'–處女 10°',
    desc: 'Uttara Phalguni 象徵契約、婚姻與社會責任。太陽統治帶來領導力與榮耀感，但比前一星宿更穩定成熟。此宿的人重視公平、有強烈的責任感。',
    qualities: '契約・責任・慷慨・成熟', guna: 'Rajas', gender: '女性',
    color: '#c07830', pada: ['射手', '摩羯', '水瓶', '雙魚'],
  },
  {
    num: 13, name: 'Hasta', sa: 'हस्त', meaning: '手',
    lord: 'Moon', lordGlyph: '☽', deity: 'Savitar（太陽力神）',
    symbol: '✋', rashi: '處女 10°–23°20\'',
    desc: 'Hasta 是靈巧之手的星宿，象徵技藝、手工與精準。月亮統治帶來情感智慧，Savitar 神賜予創造力。此宿的人心靈手巧、幽默風趣，有療癒手工的天賦。',
    qualities: '技藝・靈巧・幽默・治癒', guna: 'Rajas', gender: '男性',
    color: '#80c0a0', pada: ['牡羊', '金牛', '雙子', '巨蟹'],
  },
  {
    num: 14, name: 'Chitra', sa: 'चित्रा', meaning: '閃亮的寶石',
    lord: 'Mars', lordGlyph: '♂', deity: 'Vishvakarma（天界建築師）',
    symbol: '💎', rashi: '處女 23°20\'–天秤 6°40\'',
    desc: 'Chitra 是美麗與建築的星宿，象徵精妙的創造、珠寶與藝術。火星帶來行動力，天界建築師賜予精準的審美觀。此宿的人有強烈的視覺美感與設計天賦。',
    qualities: '美麗・設計・精妙・光輝', guna: 'Tamas', gender: '女性',
    color: '#a060c0', pada: ['獅子', '處女', '天秤', '天蠍'],
  },
  {
    num: 15, name: 'Swati', sa: 'स्वाति', meaning: '獨立的劍',
    lord: 'Rahu', lordGlyph: '☊', deity: 'Vayu（風神）',
    symbol: '🌿', rashi: '天秤 6°40\'–20°',
    desc: 'Swati 如同隨風飄動的幼苗，象徵獨立、靈活與適應力。風神 Vayu 賦予此宿流動性與溝通才能。此宿的人喜愛自由、商業頭腦敏銳，善於在不同環境中調適。',
    qualities: '獨立・靈活・商業・風格', guna: 'Tamas', gender: '女性',
    color: '#60c080', pada: ['射手', '摩羯', '水瓶', '雙魚'],
  },
  {
    num: 16, name: 'Vishakha', sa: 'विशाखा', meaning: '有分叉的',
    lord: 'Jupiter', lordGlyph: '♃', deity: 'Indra-Agni（神王與火神）',
    symbol: '⚡', rashi: '天秤 20°–天蠍 3°20\'',
    desc: 'Vishakha 象徵目標的力量與成功的渴望。受木星統治，Indra-Agni 雙神賦予此宿雙重能量——既有精神追求又有世俗征服慾。此宿的人意志堅強、不達目的不罷休。',
    qualities: '目標・競爭・意志・勝利', guna: 'Rajas', gender: '女性',
    color: '#e04040', pada: ['牡羊', '金牛', '雙子', '巨蟹'],
  },
  {
    num: 17, name: 'Anuradha', sa: 'अनुराधा', meaning: '跟隨者·後成功',
    lord: 'Saturn', lordGlyph: '♄', deity: 'Mitra（友誼神）',
    symbol: '🪷', rashi: '天蠍 3°20\'–16°40\'',
    desc: 'Anuradha 象徵友誼、奉獻與組織能力。土星帶來紀律，Mitra 神賦予外交才能與忠誠。此宿的人善於建立人際關係，有強烈的組織天賦與對友誼的深刻重視。',
    qualities: '友誼・奉獻・組織・忠誠', guna: 'Tamas', gender: '女性',
    color: '#8060c0', pada: ['獅子', '處女', '天秤', '天蠍'],
  },
  {
    num: 18, name: 'Jyeshtha', sa: 'ज्येष्ठा', meaning: '最長者·最尊貴',
    lord: 'Mercury', lordGlyph: '☿', deity: 'Indra（神王）',
    symbol: '☂️', rashi: '天蠍 16°40\'–30°',
    desc: 'Jyeshtha 是最年長者的星宿，象徵智慧、保護與責任。Indra 神賜予保護能力與領導地位。此宿的人有強烈的保護本能，常承擔家族或社群的重要責任。',
    qualities: '保護・責任・智慧・領袖', guna: 'Sattva', gender: '女性',
    color: '#406080', pada: ['射手', '摩羯', '水瓶', '雙魚'],
  },
  {
    num: 19, name: 'Mula', sa: 'मूल', meaning: '根·基礎',
    lord: 'Ketu', lordGlyph: '☋', deity: 'Nirriti（混沌女神）',
    symbol: '🌱', rashi: '射手 0°–13°20\'',
    desc: 'Mula 是深入根源的星宿，象徵徹底的探究與摧毀表面以尋找真相。Ketu 帶來靈性智慧，此宿的人有強烈的研究天賦，擅長找到事物的根本原因，但也可能面臨劇烈變化。',
    qualities: '根源・探究・靈性・蛻變', guna: 'Tamas', gender: '中性',
    color: '#a04080', pada: ['牡羊', '金牛', '雙子', '巨蟹'],
  },
  {
    num: 20, name: 'Purva Ashadha', sa: 'पूर्व आषाढ़ा', meaning: '前征服者',
    lord: 'Venus', lordGlyph: '♀', deity: 'Apas（水神）',
    symbol: '🌊', rashi: '射手 13°20\'–26°40\'',
    desc: 'Purva Ashadha 象徵不可征服的力量與淨化。水神 Apas 帶來情感深度與淨化能量。此宿的人充滿熱情、驕傲自信，對於選定的目標不輕言放棄，具有頑強的意志。',
    qualities: '力量・熱情・淨化・不敗', guna: 'Rajas', gender: '女性',
    color: '#4080e0', pada: ['獅子', '處女', '天秤', '天蠍'],
  },
  {
    num: 21, name: 'Uttara Ashadha', sa: 'उत्तर आषाढ़ा', meaning: '後征服者',
    lord: 'Sun', lordGlyph: '☉', deity: 'Vishvadevas（萬神）',
    symbol: '🏆', rashi: '射手 26°40\'–摩羯 10°',
    desc: 'Uttara Ashadha 象徵永久的勝利與正義的力量。萬神 Vishvadevas 賦予此宿廣泛的才能與高尚品格。此宿的人有強烈的正義感，追求持久的成就，不接受快速卻不實的勝利。',
    qualities: '正義・持久・高尚・成就', guna: 'Sattva', gender: '男性',
    color: '#c0a020', pada: ['射手', '摩羯', '水瓶', '雙魚'],
  },
  {
    num: 22, name: 'Shravana', sa: 'श्रवण', meaning: '聆聽者',
    lord: 'Moon', lordGlyph: '☽', deity: 'Vishnu（保護神）',
    symbol: '👂', rashi: '摩羯 10°–23°20\'',
    desc: 'Shravana 是聆聽的星宿，象徵知識的傳播與聰明的傾聽。Vishnu 保護神賦予此宿慈悲心與廣博知識。此宿的人天生善於學習、傳播知識，是優秀的傾聽者與老師。',
    qualities: '聆聽・學習・傳播・慈悲', guna: 'Rajas', gender: '男性',
    color: '#40a0c0', pada: ['牡羊', '金牛', '雙子', '巨蟹'],
  },
  {
    num: 23, name: 'Dhanishtha', sa: 'धनिष्ठा', meaning: '最富有者',
    lord: 'Mars', lordGlyph: '♂', deity: 'Ashta Vasus（八財神）',
    symbol: '🥁', rashi: '摩羯 23°20\'–水瓶 6°40\'',
    desc: 'Dhanishtha 象徵財富、音樂與慷慨。八財神 Ashta Vasus 賜予物質豐盛。火星帶來積極行動力。此宿的人對音樂有天賦，擅長積累財富，但也可能帶來婚姻上的挑戰。',
    qualities: '財富・音樂・勇氣・慷慨', guna: 'Tamas', gender: '女性',
    color: '#c06840', pada: ['獅子', '處女', '天秤', '天蠍'],
  },
  {
    num: 24, name: 'Shatabhisha', sa: 'शतभिषा', meaning: '百位醫者',
    lord: 'Rahu', lordGlyph: '☊', deity: 'Varuna（海洋神）',
    symbol: '⭕', rashi: '水瓶 6°40\'–20°',
    desc: 'Shatabhisha 是神秘療癒的星宿，象徵秘密知識與醫療技術。Rahu 帶來對隱藏事物的探索，Varuna 神賦予洞察宇宙法則的能力。此宿的人獨立孤僻，卻具有深刻的療癒天賦。',
    qualities: '療癒・神秘・獨立・秘密', guna: 'Tamas', gender: '中性',
    color: '#4060a0', pada: ['射手', '摩羯', '水瓶', '雙魚'],
  },
  {
    num: 25, name: 'Purva Bhadrapada', sa: 'पूर्व भाद्रपदा', meaning: '前幸運腳',
    lord: 'Jupiter', lordGlyph: '♃', deity: 'Aja Ekapada（神秘生物）',
    symbol: '⚡', rashi: '水瓶 20°–雙魚 3°20\'',
    desc: 'Purva Bhadrapada 象徵轉化的業火與激烈的靈性追求。此宿的人內心有強烈的雙重性——既有高度的理想主義，也可能有激進的傾向。木星帶來哲學深度。',
    qualities: '轉化・激烈・理想・雙面', guna: 'Rajas', gender: '男性',
    color: '#8040a0', pada: ['牡羊', '金牛', '雙子', '巨蟹'],
  },
  {
    num: 26, name: 'Uttara Bhadrapada', sa: 'उत्तर भाद्रपदा', meaning: '後幸運腳',
    lord: 'Saturn', lordGlyph: '♄', deity: 'Ahir Budhnya（海龍神）',
    symbol: '🐉', rashi: '雙魚 3°20\'–16°40\'',
    desc: 'Uttara Bhadrapada 象徵深海的神秘智慧與平靜的深度。土星帶來紀律與耐心，海龍神賦予深不可測的智慧。此宿的人表面平靜，內在有巨大的能量儲備，是真正的老靈魂。',
    qualities: '深度・智慧・耐心・靈性', guna: 'Tamas', gender: '男性',
    color: '#305080', pada: ['獅子', '處女', '天秤', '天蠍'],
  },
  {
    num: 27, name: 'Revati', sa: 'रेवती', meaning: '富有者·引導者',
    lord: 'Mercury', lordGlyph: '☿', deity: 'Pushan（旅行保護神）',
    symbol: '🐟', rashi: '雙魚 16°40\'–30°',
    desc: 'Revati 是星宿的終結與完成，象徵靈魂旅程的圓滿。旅行保護神 Pushan 守護旅人，水星帶來溝通與智慧。此宿的人充滿慈悲、直覺靈敏，是天生的療癒者與靈性引導者。',
    qualities: '圓滿・慈悲・引導・靈性', guna: 'Sattva', gender: '女性',
    color: '#60b0c0', pada: ['射手', '摩羯', '水瓶', '雙魚'],
  },
];

/* ── Nakshatra Wheel Canvas ── */
let activeNK = -1;

function drawNakshatraWheel(highlighted = -1) {
  const canvas = document.getElementById('nakshatraCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2;
  const outerR = Math.min(W, H) * 0.46;
  const innerR = outerR * 0.36;
  const midR   = outerR * 0.68;
  const total  = 27;
  const slice  = (Math.PI * 2) / total;
  const startAngle = -Math.PI / 2;

  ctx.clearRect(0, 0, W, H);

  // Outer glow ring
  const glow = ctx.createRadialGradient(cx, cy, outerR * 0.9, cx, cy, outerR * 1.1);
  glow.addColorStop(0, 'rgba(201,168,76,0.15)');
  glow.addColorStop(1, 'transparent');
  ctx.beginPath();
  ctx.arc(cx, cy, outerR * 1.05, 0, Math.PI * 2);
  ctx.fillStyle = glow;
  ctx.fill();

  NAKSHATRAS_DATA.forEach((nk, i) => {
    const a0 = startAngle + i * slice;
    const a1 = a0 + slice;
    const isActive = i === highlighted;

    // Sector
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, outerR, a0, a1);
    ctx.closePath();

    if (isActive) {
      const grad = ctx.createRadialGradient(cx, cy, innerR, cx, cy, outerR);
      grad.addColorStop(0, 'rgba(201,168,76,0.35)');
      grad.addColorStop(1, nk.color + '55');
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = nk.color + '18';
    }
    ctx.fill();

    // Border
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, outerR, a0, a1);
    ctx.closePath();
    ctx.strokeStyle = isActive ? 'rgba(201,168,76,0.8)' : 'rgba(201,168,76,0.2)';
    ctx.lineWidth = isActive ? 1.5 : 0.7;
    ctx.stroke();

    // Number label
    const labelAngle = a0 + slice / 2;
    const labelR = outerR * 0.84;
    ctx.save();
    ctx.translate(cx + Math.cos(labelAngle) * labelR, cy + Math.sin(labelAngle) * labelR);
    ctx.rotate(labelAngle + Math.PI / 2);
    ctx.fillStyle = isActive ? '#f0d080' : 'rgba(201,168,76,0.55)';
    ctx.font = `${isActive ? '700 ' : ''}${outerR < 200 ? '9' : '10'}px Cinzel, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(nk.num, 0, 0);
    ctx.restore();

    // Short name label
    const nameR = outerR * 0.57;
    ctx.save();
    ctx.translate(cx + Math.cos(labelAngle) * nameR, cy + Math.sin(labelAngle) * nameR);
    ctx.rotate(labelAngle + Math.PI / 2);
    ctx.fillStyle = isActive ? '#fff' : 'rgba(230,215,190,0.5)';
    ctx.font = `${outerR < 200 ? '7' : '8'}px Noto Serif TC, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // Only show short name if there's enough space
    if (outerR > 180) {
      const shortName = nk.name.length > 8 ? nk.name.slice(0, 7) + '…' : nk.name;
      ctx.fillText(shortName, 0, 0);
    }
    ctx.restore();
  });

  // Inner circle
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  const innerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, innerR);
  innerGrad.addColorStop(0, 'rgba(15,10,28,1)');
  innerGrad.addColorStop(1, 'rgba(20,14,36,1)');
  ctx.fillStyle = innerGrad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(201,168,76,0.4)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Centre text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${Math.round(innerR * 0.35)}px Cinzel, serif`;
  ctx.fillStyle = 'rgba(201,168,76,0.7)';
  ctx.fillText('🔱', cx, cy - innerR * 0.12);
  ctx.font = `${Math.round(innerR * 0.17)}px Noto Serif TC, serif`;
  ctx.fillStyle = 'rgba(201,168,76,0.45)';
  ctx.fillText('27 Nakshatra', cx, cy + innerR * 0.28);
}

function showNakshatraInfo(idx) {
  const nk = NAKSHATRAS_DATA[idx];
  const panel = document.getElementById('nakshatraInfo');
  if (!panel) return;

  panel.innerHTML = `
    <div class="nakshatra-num">${String(nk.num).padStart(2, '0')}</div>
    <div class="nakshatra-name">${nk.name}</div>
    <div class="nakshatra-meaning">${nk.sa} · ${nk.meaning}</div>
    <div class="nakshatra-ruler">${nk.lordGlyph} 統治星：${nk.lord} &nbsp;｜&nbsp; ${nk.symbol} ${nk.deity}</div>
    <p class="nakshatra-desc">${nk.desc}</p>
    <div class="nakshatra-attrs">
      <div class="nakshatra-attr"><label>星座範圍</label><span>${nk.rashi}</span></div>
      <div class="nakshatra-attr"><label>特質</label><span>${nk.qualities}</span></div>
      <div class="nakshatra-attr"><label>Guna 德性</label><span>${nk.guna}</span></div>
      <div class="nakshatra-attr"><label>性別</label><span>${nk.gender}</span></div>
    </div>
  `;
}

function buildNakshatraMiniGrid() {
  const grid = document.getElementById('nakshatraGrid');
  if (!grid) return;

  NAKSHATRAS_DATA.forEach((nk, i) => {
    const card = document.createElement('div');
    card.className = 'nakshatra-mini-card';
    card.dataset.idx = i;
    card.innerHTML = `
      <div class="nk-num">${String(nk.num).padStart(2,'0')}</div>
      <div class="nk-name">${nk.name}</div>
      <div class="nk-lord" style="color:${nk.color}">${nk.lordGlyph} ${nk.lord}</div>
    `;
    card.addEventListener('click', () => {
      document.querySelectorAll('.nakshatra-mini-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      activeNK = i;
      drawNakshatraWheel(i);
      showNakshatraInfo(i);
    });
    grid.appendChild(card);
  });
}

function initNakshatraCanvas() {
  const canvas = document.getElementById('nakshatraCanvas');
  if (!canvas) return;

  drawNakshatraWheel(-1);

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width  / rect.width);
    const my = (e.clientY - rect.top)  * (canvas.height / rect.height);
    const cx = canvas.width / 2, cy = canvas.height / 2;
    const outerR = Math.min(canvas.width, canvas.height) * 0.46;
    const innerR = outerR * 0.36;

    const dx = mx - cx, dy = my - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < innerR || dist > outerR) return;

    let angle = Math.atan2(dy, dx) + Math.PI / 2;
    if (angle < 0) angle += Math.PI * 2;
    const slice = (Math.PI * 2) / 27;
    const idx = Math.floor(angle / slice);
    const clamped = Math.min(idx, 26);

    activeNK = clamped;
    drawNakshatraWheel(clamped);
    showNakshatraInfo(clamped);

    document.querySelectorAll('.nakshatra-mini-card').forEach((c, ci) => {
      c.classList.toggle('active', ci === clamped);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildNakshatraMiniGrid();
  initNakshatraCanvas();
});
