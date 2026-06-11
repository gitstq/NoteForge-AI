<div align="center">

# NoteForge AI

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/Tauri-2.0-FFC131?logo=tauri" alt="Tauri">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react" alt="React">
  <img src="https://img.shields.io/badge/FastAPI-0.111-009688?logo=fastapi" alt="FastAPI">
  <img src="https://img.shields.io/badge/GLM--5.1-AI-purple" alt="GLM-5.1">
</p>

**AI 增強的輕量級 Markdown 知識庫桌面應用**

[简体中文](README.md) | [English](README_EN.md)

</div>

---

## 目錄

- [項目介紹](#-項目介紹)
- [核心特性](#-核心特性)
- [快速開始](#-快速開始)
- [詳細使用指南](#-詳細使用指南)
- [設計思路與迭代規劃](#-設計思路與迭代規劃)
- [打包與部署指南](#-打包與部署指南)
- [貢獻指南](#-貢獻指南)
- [開源協議](#-開源協議)

---

## 項目介紹

NoteForge AI 是一款**AI 增強的輕量級 Markdown 知識庫桌面應用**，靈感來源於 GitHub Trending 熱門項目 `tolaria`，但採用完全不同的技術棧進行差異化實現。

與傳統 Markdown 編輯器不同，NoteForge AI 深度集成了 **智譜 GLM-5.1 大模型**，為你的知識管理帶來智能化體驗：

- 自動為筆記生成智能標籤
- 一鍵總結長文內容
- AI 助手隨時解答筆記相關問題
- 基於語義的全文檢索

### 為什麼選擇 NoteForge AI？

| 特性 | 傳統編輯器 | NoteForge AI |
|------|-----------|-------------|
| Markdown 編輯 | 支持 | 支持 |
| 實時預覽 | 支持 | 支持 |
| AI 智能標籤 | 不支持 | 支持 |
| AI 內容總結 | 不支持 | 支持 |
| AI 問答助手 | 不支持 | 支持 |
| 語義搜索 | 不支持 | 支持 |
| 桌面端體積 | 大 (Electron) | 小 (Tauri) |

---

## 核心特性

### 編輯器
- 所見即所得的 Markdown 編輯體驗
- 實時預覽，編輯與預覽同步
- 支持代碼高亮、數學公式、表格等完整 Markdown 語法
- 深色/淺色主題一鍵切換

### AI 能力 (GLM-5.1)
- 智能標籤生成：根據筆記內容自動推薦標籤
- 內容總結：一鍵生成筆記摘要和關鍵詞
- AI 助手：基於當前筆記上下文進行智能問答
- 支持自定義 GLM API Key

### 知識管理
- 文件夾層級管理
- 標籤分類系統
- 全文搜索（標題、內容、標籤）
- 最近編輯快速訪問

### 技術亮點
- **Tauri 2.0**：比 Electron 體積小 90%，更安全
- **React 18 + TypeScript**：類型安全，開發體驗佳
- **FastAPI 後端**：高性能異步 Python 後端
- **Zustand 狀態管理**：輕量簡潔
- **Tailwind CSS**：原子化樣式，快速開發

---

## 快速開始

### 環境要求

| 依賴 | 版本要求 |
|------|---------|
| Node.js | >= 18.0 |
| Python | >= 3.10 |
| Rust | >= 1.70 |
| npm/pnpm | >= 9.0 |

### 1. 克隆倉庫

```bash
git clone https://github.com/gitstq/NoteForge-AI.git
cd NoteForge-AI
```

### 2. 安裝前端依賴

```bash
npm install
```

### 3. 安裝後端依賴

```bash
cd noteforge_server
pip install -r requirements.txt
cd ..
```

### 4. 配置 GLM API Key

```bash
echo "GLM_API_KEY=your_glm_api_key_here" > noteforge_server/.env
```

> 獲取 GLM API Key：[智譜 AI 開放平台](https://open.bigmodel.cn/)

### 5. 啟動開發環境

**終端 1 - 啟動後端服務：**
```bash
npm run server:dev
```

**終端 2 - 啟動前端開發服務器：**
```bash
npm run tauri:dev
```

應用將自動打開，開始你的智能筆記之旅！

---

## 詳細使用指南

### 創建筆記

1. 點擊側邊欄的 `+` 按鈕
2. 輸入筆記標題
3. 在編輯器中編寫 Markdown 內容
4. 右側實時預覽你的排版效果

### 使用 AI 標籤

1. 編寫完筆記內容後，點擊編輯器頂部的 **AI標籤** 按鈕
2. GLM-5.1 將分析內容並推薦相關標籤
3. 標籤會自動添加到筆記中，你也可以手動添加或刪除

### AI 總結

1. 切換到 **AI助手** 面板
2. 點擊 **總結當前筆記** 按鈕
3. 查看 AI 生成的摘要和關鍵詞

### 搜索筆記

1. 切換到 **搜索** 面板
2. 輸入關鍵詞
3. 系統會在標題、內容和標籤中搜索，按匹配度排序

---

## 設計思路與迭代規劃

### 架構設計

```
NoteForge-AI/
├── src/                    # React 前端
│   ├── components/         # UI 組件
│   ├── hooks/             # 自定義 Hooks
│   └── styles/            # 全局樣式
├── src-tauri/             # Tauri 桌面端封裝
├── noteforge_server/      # Python 後端
│   ├── app/               # FastAPI 應用
│   │   └── routers/       # API 路由
│   └── core/              # 核心配置
└── docs/                  # 文檔
```

### 迭代規劃

- [x] v1.0.0 - 基礎功能
  - [x] Markdown 編輯與預覽
  - [x] 筆記 CRUD
  - [x] 文件夾管理
  - [x] AI 標籤生成
  - [x] AI 內容總結
  - [x] AI 問答助手
  - [x] 全文搜索

- [ ] v1.1.0 - 增強功能
  - [ ] 語義搜索（向量檢索）
  - [ ] 筆記導出（PDF/HTML）
  - [ ] 數據同步（WebDAV/雲存儲）
  - [ ] 插件系統

- [ ] v1.2.0 - 協作功能
  - [ ] 多用戶支持
  - [ ] 筆記分享
  - [ ] 版本歷史

---

## 打包與部署指南

### 構建桌面應用

```bash
npm run tauri:build
```

構建產物將位於 `src-tauri/target/release/` 目錄：
- Windows: `NoteForge AI.exe`
- macOS: `NoteForge AI.app`
- Linux: `noteforge-ai`

### 後端部署

```bash
cd noteforge_server
uvicorn app.main:app --host 127.0.0.1 --port 8787
```

---

## 貢獻指南

我們歡迎所有形式的貢獻！

### 提交 Issue

- 使用清晰的標題描述問題
- 提供復現步驟
- 標註環境信息（操作系統、Node版本等）

### 提交 PR

1. Fork 本倉庫
2. 創建特性分支：`git checkout -b feat/amazing-feature`
3. 提交更改：`git commit -m 'feat: add amazing feature'`
4. 推送分支：`git push origin feat/amazing-feature`
5. 提交 Pull Request

---

## 開源協議

本項目採用 [MIT 協議](LICENSE) 開源。

---

<div align="center">

**用 AI 賦能你的知識管理**

[GitHub](https://github.com/gitstq/NoteForge-AI) | [Issues](https://github.com/gitstq/NoteForge-AI/issues) | [Releases](https://github.com/gitstq/NoteForge-AI/releases)

</div>
