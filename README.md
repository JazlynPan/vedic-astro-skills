# Vedic Astro Skills：Codex Cloud 台灣設定

以官方 [CNWU16/vedic-astro-skills](https://github.com/CNWU16/vedic-astro-skills) 最新版為基準的完整 Codex 安裝。舊版三模組、Claude commands 與舊報告工具已移除。

## 安裝內容

官方 Suite v8.0 的八個 Skills 位於 `.agents/skills/`：

- `vedic-calculator`：原生排盤計算。
- `vedic-reader`：PDF／圖片讀盤與資料核對。
- `vedic-core`：完整本命分析。
- `vedic-career`：職涯分析。
- `vedic-love`：感情分析。
- `vedic-rectifier`：出生時間校正。
- `vedic-synastry`：雙人合盤。
- `vedic-prashna`：問事盤。

完整腳本、資源、agents 設定、測試與 Swiss Ephemeris 星曆檔均保留。Codex Patch v1.3.0 的十一個模組位於 `.codex/`，原始補丁與授權另存於 `vendor/vedic-upstream/`。根目錄 `AGENTS.md` 整合官方路由及台灣在地化規則。

## 雲端使用

新任務以本倉庫為工作目錄，先執行 `bash scripts/codex_setup.sh`，之後使用 `.agents/skills/vedic-calculator/venv/bin/python`。Python 支援範圍為 3.8–3.13，目前驗證 Linux Python 3.12.14；虛擬環境可重建，不提交 Git。

Skills 與專案指令隨倉庫保存；未設定平台層級自動安裝 hook。完整版本、更新方式、測試與限制見 [安裝紀錄](docs/CODEX_CLOUD_TW.md)，來源鎖定與雜湊見 `vedic-upstream.lock.json`。

## 語言與個資

使用台灣繁體中文，專業詞彙首次出現附中文與原文；核對台北／上海歷史夏令時間，先評估出生時間與分盤穩定性，再進行獨立分析及事件驗證。占星是傳統詮釋框架，不作為已證實的科學事實。

個人出生資料、命盤、事件與報告只放在不追蹤的 `private/`，不得提交到公開倉庫。

## 授權

官方內容依 [AGPL-3.0](LICENSE) 及額外 [COMMERCIAL_NOTICE](COMMERCIAL_NOTICE) 適用，保留官方歸屬；不得將本版本描述為舊版 MIT 發行。官方 prompt 與 resources 的商用使用須遵循其額外條款。
