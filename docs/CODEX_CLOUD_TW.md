# Codex Cloud 安裝與驗證紀錄

## 安裝版本與清單

- 目標基準：`JazlynPan/vedic-astro-skills`，`763afbdb3475d0a53b278d789f40580ff3618b30`。
- 官方來源：<https://github.com/CNWU16/vedic-astro-skills>。
- 官方最新版（2026-11-03 取得）：`e33bf00c90e026f67bad474576e822b08fb56940`，Suite v8.0、Codex Patch v1.3.0。
- 依操作者後續明確指示，以最新版取代舊倉庫內容：移除 `core/`、`career/`、`love/`、舊 Claude commands 與 `scripts/report_builder.py`，README 改為目前版本。根目錄改放官方 AGPL 授權與 COMMERCIAL_NOTICE，不再沿用舊版 MIT 宣告。
- 新的官方 Codex 發行面放在 `.agents/skills/`，完整保留來源內的所有檔案，包含 scripts、resources、測試、三個二進位星曆檔與 `agents/openai.yaml`。此版來源未設 `references/`，沒有省略該目錄；未來來源內新增的子目錄也由同步程式完整帶入。

| Skill | 用途 | 官方檔案數 |
| --- | --- | ---: |
| vedic-calculator | 排盤計算 | 21 |
| vedic-career | 職涯分析 | 3 |
| vedic-core | 完整本命分析 | 9 |
| vedic-love | 感情分析 | 3 |
| vedic-prashna | 問事盤 | 29 |
| vedic-reader | 讀盤與驗證 | 6 |
| vedic-rectifier | 出生時間校正 | 8 |
| vedic-synastry | 雙人合盤 | 14 |

十一個補丁模組：`vedic_uc_firewall.md`、`vedic_client_voice.md`、`vedic_core_life_rendering.md`、`vedic_rectifier_execution_overlay.md`、`vedic_rectifier_settlement.md`、`vedic_rectifier_question_design.md`、`vedic_rectifier_interval_guard.md`、`vedic_blind_qa_prompt.md`、`vedic_consultative_integration_prompt.md`、`vedic_output_router.md`、`vedic_qa_rendering.md`。

官方 `codex-patch/` 的路由器、模組與說明完整保存於 `vendor/vedic-upstream/codex-patch/`。執行副本放在專案 `.codex/`，僅將指向全域 `~/.codex/` 的路徑改為專案 `.codex/`。完整路由器合併進根目錄 `AGENTS.md` 的具名管理區塊，接續台灣規則；既有內容保留。若同層存在 `AGENTS.override.md`，同步程式也保留其原文並合併區塊。本次目標倉庫沒有這兩個既有檔案。

`vedic-upstream.lock.json` 記錄來源 commit 與 124 個發行／授權／補丁檔案的 SHA-256，另記指令管理區塊雜湊。沒有安裝非官方八模組清單內的 Pro。

## 雲端持續生效方式

Skills、指令、補丁、安裝腳本與版本鎖都提交到這個 PR 分支，不依賴 `/tmp` 或全域家目錄。Codex 在以此專案為工作目錄的新任務中，可從 `.agents/skills/` 探索 Skills，從根目錄 `AGENTS.md` 取得路由規則。從子目錄工作時仍以專案根目錄解析路徑。

根目錄規則要求新任務先執行 `bash scripts/codex_setup.sh`。腳本使用官方 `setup_env.py` 建立／修復專案內 `.agents/skills/vedic-calculator/venv/`，再執行官方 `check_env.py` 及會以非零狀態回報失敗的額外驗證。Linux Python 3.12 使用已驗證的 `requirements-vedic-linux.txt` 完整套件版本；其他官方支援 Python 3.8–3.13 使用官方相容依賴解析，不保證此 3.12 鎖檔能跨版本套用。虛擬環境不提交，重建需要 PyPI 網路連線。

本次實際 Python 路徑：`.agents/skills/vedic-calculator/venv/bin/python`。

平台的 Codex Cloud 環境設定頁未提供可寫工具，因此沒有宣稱已儲存平台層級的 setup／maintenance hook。若環境本來已設定 hook，可將同一腳本作為入口；本 PR 的持續機制是版本控制內的 Skills 與每個新任務會讀到的專案指令。已開啟的任務不保證重新載入 Skill 清單；合併後新建以此倉庫為根目錄的任務。合併前須選此 PR 分支，`main` 尚未包含安裝內容。其他倉庫不會自動得到本專案 Skills。

## 更新與保護

重建依賴：`bash scripts/codex_setup.sh`。來源離線完整性：`python3 scripts/verify_vedic.py --files-only`。

重新安裝鎖定版本：`python3 scripts/sync_vedic.py`。更新時在獨立分支指定已審閱的官方 commit：`python3 scripts/sync_vedic.py --ref <official-commit>`；也可用 `--source <clean-official-checkout>`。同步會完整帶入八個 Skills 及所有補丁附檔，不只 SKILL.md；來源清單改變時停止要求檢查。管理區塊外的指令原文會保留，若新增根目錄 override，重新同步以合併；子目錄更具體的指令仍須另行檢查。

受管理檔案或路由區塊有本地修改時，更新在寫入前拒絕，不直接覆蓋。官方原始檔與執行副本分開保存，以便核對路徑轉換。更新上游後須重新檢查套件版本相容性、更新依賴鎖及測試紀錄，不能沿用這份安裝紀錄聲稱新版本已驗證。

## 實測結果（2026-11-03，Linux／Python 3.12.14）

| 驗證 | 結果 |
| --- | --- |
| 首次官方 check_env.py | 缺少 pysweph、PyJHora；已由官方 setup_env.py 修復 |
| 官方 setup_env.py 安裝及重跑 | 通過；內建 SAV=337 |
| 官方 check_env.py 修復後 | 通過；SAV=337、Lagna=Virgo、DK_7K=Mercury |
| 完整性 | 八個 Skills、八份 agents 設定、十一個模組、124 個檔案雜湊與路由區塊通過 |
| 星曆 | engine 與 PyJHora 三個 .se1 檔齊全且逐位元相同 |
| 額外最小測試 | 官方 Gandhi 測試 SAV=337 |
| 官方 engine 精度回歸 | 11 項全數通過，含秒數、DST、D9／Lagna 一致性、極圈與失敗回報 |
| 官方 Prashna 隔離及算例 | 全數通過 |
| 台灣／中國大陸時區 | 台北 1979 夏令時間 +9、冬季 +8；上海 1988 夏令時間 +9、冬季 +8；2026 均 +8；ZoneInfo、排盤引擎及 UTC 儒略日轉換一致 |
| 台北 DST 歧義 | 1979 啟用夏令時間時的不存在時間、結束時的重複時間都拒絕默選 |
| 更新安全性 | 臨時測試倉庫驗證既有 AGENTS／override 原文保留、重跑無差異、本地模組／路由修改在寫入前被拒絕 |

主要版本：`pysweph 2.10.3.6`（Swiss Ephemeris `2.10.03`）、`PyJHora 4.8.6`、`pytz 2026.6`、`tzdata 2026.6`、`numpy 2.5.4`、`timezonefinder 9.2.0`。完整依賴見 `requirements-vedic-linux.txt`。

## 授權、個資與限制

根目錄及 `vendor/vedic-upstream/` 保存官方 AGPL-3.0 全文與額外 `COMMERCIAL_NOTICE`，官方內容不是重新授權為 MIT，其適用範圍包含官方 Skills、prompt、resources、補丁原文與衍生路由器／模組。請遵循官方商用限制與歸屬；本文件不代替法律意見。

台灣繁中、首次術語中英對照、歷史 DST、分盤穩定性、先鎖定獨立分析再驗證、保留反證及不將占星當科學事實，均已納入專案指令。個人資料與報告只放 `private/`；忽略規則已加入並驗證，不提交虛擬環境或私人資料。測試只使用官方既有測試與合成曆法時間，未使用任何使用者出生資料。

尚未驗證：其他 Python 版本／架構、真實個案準確率、平台全新任務是否實際顯示全部 Skills。計算測試通過只證明安裝和程式算例通過，不能證明占星預測具有科學效度。初次預設沙箱連線無法連到 proxy，改用此環境允許的網路權限後已正常取得來源及套件；無尚未修復的安裝／計算失敗。

`git diff --check` 對上游原有行尾空白提出警告；為維持官方檔案逐位元一致，保留這些空白。自行新增的腳本與說明已另行通過空白檢查。

## GitHub 交付與授權複查

GitHub Connector 安裝與倉庫授權完成後，重新檢查已能列出 JazlynPan 的 App 安裝，並已成功將 `codex/install-vedic-skills-tw` 推送到目標倉庫。先前 GitHub HTTP 403 的寫入阻礙已解除。

授權修復後再次執行 `bash scripts/codex_setup.sh`，官方環境檢查、SAV=337、124 個檔案雜湊及台北／上海歷史 DST 測試均通過；重新核對官方 main 仍為本紀錄鎖定的最新版 commit。操作者後續明確授權以最新版替換舊倉庫並更新 main，因此本次將更新 PR #2，驗證後合併；不需要重寫 Git 歷史。私人命盤檔案不在 PR 或部署範圍內。
