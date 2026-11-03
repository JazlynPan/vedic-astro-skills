# 月宿兼容筛查规则 (koota-policy)

> 合盘 Layer 1「月宿与基础兼容」的规则。
> 体系：KN Rao 态度 —— Ashtakoota 只作月宿层**筛查**，不裁决、不给 X/36 总分。
> 数据来源：双方 structured_data.md 的 Nakshatra 表（Moon 的 Nakshatra/Pada）+ 月亮星座座主（尊贵度/座主信息）。

---

## 0. 定位铁规

- 方法：**North 八项（Guna Milan）为主**。
- **不输出 X/36 总分**，拆成现代关系维度给信号。
- **dosha 不一票否决**：只把对应维度降级，最终裁决交给 Layer 2/3。
- KN Rao 立场：月宿兼容是入门筛查，真正承载力看 D1/D9 的 7宫 + Dasha 同步（Layer 0/2/3）。

---

## 1. 八项 → 现代关系维度映射

| Koota | 传统含义 | 映射到的现代维度 |
|-------|---------|----------------|
| Varna | 精神/价值层级 | 心智友好度 |
| Vashya | 吸引与主导 | 吸引方向（谁更主动）|
| Tara/Dina | 星宿吉凶/运势相照 | 关系稳定度 |
| Yoni | 体质符号/亲密 | 身体亲密风格 |
| Graha Maitri | 月亮座主友谊 | 心智友好度 / 精神契合 |
| Gana | 神/人/罗刹性情 | 气质与冲突风格 |
| Bhakoot | 月亮星座相对位置 | 情绪节奏 / 家庭生活方向 |
| Nadi | 体质/深层 | 生理与深层兼容 |

> 输出六维信号：情绪节奏 / 日常适应 / 身体亲密风格 / 心智友好度 / 气质冲突风格 / 家庭生活方向。
> 每维只给"支持 / 中性 / 制约"，不给分数。

---

## 2. 计算要点（只用 structured_data 已有数据）

- Varna：双方 Moon 星座 → 水(Brahmin)/火(Kshatriya)/土(Vaishya)/风(Shudra)层级比较。
- Vashya：Moon 星座的 Vashya 组别表。
- Tara：从对方 Moon Nakshatra 起数到己方 Moon Nakshatra，落 9 组 Tara 的吉凶。
- Yoni：Nakshatra → 14 动物符号表，同/友/中/敌/天敌。
- Graha Maitri：双方 Moon 星座座主的自然友敌（用 structured_data 的座主 + 自然关系）。
- Gana：Nakshatra → Deva/Manushya/Rakshasa。
- Bhakoot：双方 Moon 星座相对位置（计数 1-12）。
- Nadi：Nakshatra → Adi/Madhya/Antya 三组。

---

## 3. Dosha 减免（采用通行 BPHS，且一律不否决）

| Dosha | 触发 | 减免（满足任一即免）|
|-------|------|------------------|
| Nadi | 双方同 Nadi 组 | 同 Nakshatra 不同 Pada；或双方 Moon 星座座主相同 |
| Bhakoot | 相对位置 6/8、2/12、5/9 | 双方 Moon 星座座主相同或互为自然友星 |
| Gana | 对方 Rakshasa × 己方 Deva | 双方 Moon 星座座主友好；或 Bhakoot 同时成立支持 |

> ⚠️ dosha 即使成立也**不否决关系**，只把对应现代维度标"制约"，写明可由 Layer 2 修复资源 / Layer 0 承载力补偿。

---

## 4. South 附加项（不做）

Mahendra / Vedha / Rajju / Sthree Dheerga —— 超出本体系筛查范围，本系统不做；
用户问及时明说"超出本体系筛查范围，不做判定"，禁止凭通识排查表补算。

---

## 5. 禁止事项

- 不给"X/36 匹配度"总分，不据此下"合不合"结论。
- 传统"男/女"方向性规则改用 A/B 方向；传统异性恋可令 A=男方 / B=女方对应传统方向（本层只筛查不裁决，方向性影响有限）；同性/非二元不套传统性别角色。
- 不引入西方星座配对（太阳星座合盘）话术。
- 月宿结论一律标注"仅月宿层筛查，承载力以 Layer 0/2/3 为准"。
