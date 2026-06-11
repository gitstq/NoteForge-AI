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

**AI-Powered Lightweight Markdown Knowledge Base Desktop App**

[简体中文](README.md) | [繁體中文](README_TW.md)

</div>

---

## Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Usage Guide](#-usage-guide)
- [Design & Roadmap](#-design--roadmap)
- [Build & Deploy](#-build--deploy)
- [Contributing](#-contributing)
- [License](#-license)

---

## Introduction

NoteForge AI is an **AI-powered lightweight Markdown knowledge base desktop application**, inspired by the GitHub Trending project `tolaria`, but implemented with a completely different technology stack for differentiation.

Unlike traditional Markdown editors, NoteForge AI deeply integrates the **Zhipu GLM-5.1 large language model** to bring an intelligent experience to your knowledge management:

- Auto-generate smart tags for notes
- One-click summarization of long content
- AI assistant for note-related questions
- Semantic full-text search

### Why NoteForge AI?

| Feature | Traditional Editor | NoteForge AI |
|---------|-------------------|--------------|
| Markdown Editing | Yes | Yes |
| Live Preview | Yes | Yes |
| AI Smart Tags | No | Yes |
| AI Summarization | No | Yes |
| AI Q&A Assistant | No | Yes |
| Semantic Search | No | Yes |
| Desktop Size | Large (Electron) | Small (Tauri) |

---

## Features

### Editor
- WYSIWYG Markdown editing experience
- Real-time preview with sync
- Full Markdown syntax support: code highlighting, math formulas, tables
- Dark/Light theme toggle

### AI Capabilities (GLM-5.1)
- Smart Tag Generation: Auto-recommend tags based on content
- Content Summarization: One-click summary and keywords
- AI Assistant: Context-aware Q&A based on current note
- Custom GLM API Key support

### Knowledge Management
- Folder hierarchy management
- Tag classification system
- Full-text search (title, content, tags)
- Quick access to recently edited notes

### Technical Highlights
- **Tauri 2.0**: 90% smaller than Electron, more secure
- **React 18 + TypeScript**: Type-safe, great DX
- **FastAPI Backend**: High-performance async Python backend
- **Zustand State Management**: Lightweight and simple
- **Tailwind CSS**: Atomic styles, rapid development

---

## Quick Start

### Requirements

| Dependency | Version |
|-----------|---------|
| Node.js | >= 18.0 |
| Python | >= 3.10 |
| Rust | >= 1.70 |
| npm/pnpm | >= 9.0 |

### 1. Clone Repository

```bash
git clone https://github.com/gitstq/NoteForge-AI.git
cd NoteForge-AI
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd noteforge_server
pip install -r requirements.txt
cd ..
```

### 4. Configure GLM API Key

```bash
echo "GLM_API_KEY=your_glm_api_key_here" > noteforge_server/.env
```

> Get GLM API Key: [Zhipu AI Open Platform](https://open.bigmodel.cn/)

### 5. Start Development

**Terminal 1 - Start Backend:**
```bash
npm run server:dev
```

**Terminal 2 - Start Frontend:**
```bash
npm run tauri:dev
```

The app will open automatically. Start your intelligent note-taking journey!

---

## Usage Guide

### Create a Note

1. Click the `+` button in the sidebar
2. Enter note title
3. Write Markdown content in the editor
4. Preview your formatting in real-time on the right

### Use AI Tags

1. After writing note content, click the **AI Tags** button
2. GLM-5.1 will analyze content and recommend tags
3. Tags are auto-added; you can also manually add or remove

### AI Summarization

1. Switch to the **AI Assistant** panel
2. Click **Summarize Current Note**
3. View AI-generated summary and keywords

### Search Notes

1. Switch to the **Search** panel
2. Enter keywords
3. System searches titles, content, and tags, sorted by relevance

---

## Design & Roadmap

### Architecture

```
NoteForge-AI/
├── src/                    # React Frontend
│   ├── components/         # UI Components
│   ├── hooks/             # Custom Hooks
│   └── styles/            # Global Styles
├── src-tauri/             # Tauri Desktop Wrapper
├── noteforge_server/      # Python Backend
│   ├── app/               # FastAPI App
│   │   └── routers/       # API Routes
│   └── core/              # Core Config
└── docs/                  # Documentation
```

### Roadmap

- [x] v1.0.0 - Basic Features
  - [x] Markdown editing and preview
  - [x] Note CRUD
  - [x] Folder management
  - [x] AI tag generation
  - [x] AI summarization
  - [x] AI Q&A assistant
  - [x] Full-text search

- [ ] v1.1.0 - Enhanced Features
  - [ ] Semantic search (vector retrieval)
  - [ ] Note export (PDF/HTML)
  - [ ] Data sync (WebDAV/Cloud)
  - [ ] Plugin system

- [ ] v1.2.0 - Collaboration
  - [ ] Multi-user support
  - [ ] Note sharing
  - [ ] Version history

---

## Build & Deploy

### Build Desktop App

```bash
npm run tauri:build
```

Build artifacts in `src-tauri/target/release/`:
- Windows: `NoteForge AI.exe`
- macOS: `NoteForge AI.app`
- Linux: `noteforge-ai`

### Backend Deployment

```bash
cd noteforge_server
uvicorn app.main:app --host 127.0.0.1 --port 8787
```

---

## Contributing

We welcome all forms of contributions!

### Submit Issue

- Use clear title describing the problem
- Provide reproduction steps
- Label environment info (OS, Node version, etc.)

### Submit PR

1. Fork this repository
2. Create feature branch: `git checkout -b feat/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push branch: `git push origin feat/amazing-feature`
5. Open Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Empower Your Knowledge Management with AI**

[GitHub](https://github.com/gitstq/NoteForge-AI) | [Issues](https://github.com/gitstq/NoteForge-AI/issues) | [Releases](https://github.com/gitstq/NoteForge-AI/releases)

</div>
