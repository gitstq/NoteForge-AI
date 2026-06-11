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

**AI增强的轻量级 Markdown 知识库桌面应用**

[English](README_EN.md) | [繁體中文](README_TW.md)

</div>

---

## 目录

- [项目介绍](#-项目介绍)
- [核心特性](#-核心特性)
- [快速开始](#-快速开始)
- [详细使用指南](#-详细使用指南)
- [设计思路与迭代规划](#-设计思路与迭代规划)
- [打包与部署指南](#-打包与部署指南)
- [贡献指南](#-贡献指南)
- [开源协议](#-开源协议)

---

## 项目介绍

NoteForge AI 是一款**AI增强的轻量级 Markdown 知识库桌面应用**，灵感来源于 GitHub Trending 热门项目 `tolaria`，但采用完全不同的技术栈进行差异化实现。

与传统 Markdown 编辑器不同，NoteForge AI 深度集成了 **智谱 GLM-5.1 大模型**，为你的知识管理带来智能化体验：

- 自动为笔记生成智能标签
- 一键总结长文内容
- AI 助手随时解答笔记相关问题
- 基于语义的全文检索

### 为什么选择 NoteForge AI？

| 特性 | 传统编辑器 | NoteForge AI |
|------|-----------|-------------|
| Markdown 编辑 | 支持 | 支持 |
| 实时预览 | 支持 | 支持 |
| AI 智能标签 | 不支持 | 支持 |
| AI 内容总结 | 不支持 | 支持 |
| AI 问答助手 | 不支持 | 支持 |
| 语义搜索 | 不支持 | 支持 |
| 桌面端体积 | 大 (Electron) | 小 (Tauri) |

---

## 核心特性

### 编辑器
- 所见即所得的 Markdown 编辑体验
- 实时预览，编辑与预览同步
- 支持代码高亮、数学公式、表格等完整 Markdown 语法
- 深色/浅色主题一键切换

### AI 能力 (GLM-5.1)
- 智能标签生成：根据笔记内容自动推荐标签
- 内容总结：一键生成笔记摘要和关键词
- AI 助手：基于当前笔记上下文进行智能问答
- 支持自定义 GLM API Key

### 知识管理
- 文件夹层级管理
- 标签分类系统
- 全文搜索（标题、内容、标签）
- 最近编辑快速访问

### 技术亮点
- **Tauri 2.0**：比 Electron 体积小 90%，更安全
- **React 18 + TypeScript**：类型安全，开发体验佳
- **FastAPI 后端**：高性能异步 Python 后端
- **Zustand 状态管理**：轻量简洁
- **Tailwind CSS**：原子化样式，快速开发

---

## 快速开始

### 环境要求

| 依赖 | 版本要求 |
|------|---------|
| Node.js | >= 18.0 |
| Python | >= 3.10 |
| Rust | >= 1.70 |
| npm/pnpm | >= 9.0 |

### 1. 克隆仓库

```bash
git clone https://github.com/gitstq/NoteForge-AI.git
cd NoteForge-AI
```

### 2. 安装前端依赖

```bash
npm install
```

### 3. 安装后端依赖

```bash
cd noteforge_server
pip install -r requirements.txt
cd ..
```

### 4. 配置 GLM API Key

```bash
# 创建环境变量文件
echo "GLM_API_KEY=your_glm_api_key_here" > noteforge_server/.env
```

> 获取 GLM API Key：[智谱 AI 开放平台](https://open.bigmodel.cn/)

### 5. 启动开发环境

**终端 1 - 启动后端服务：**
```bash
npm run server:dev
```

**终端 2 - 启动前端开发服务器：**
```bash
npm run tauri:dev
```

应用将自动打开，开始你的智能笔记之旅！

---

## 详细使用指南

### 创建笔记

1. 点击侧边栏的 `+` 按钮
2. 输入笔记标题
3. 在编辑器中编写 Markdown 内容
4. 右侧实时预览你的排版效果

### 使用 AI 标签

1. 编写完笔记内容后，点击编辑器顶部的 **AI标签** 按钮
2. GLM-5.1 将分析内容并推荐相关标签
3. 标签会自动添加到笔记中，你也可以手动添加或删除

### AI 总结

1. 切换到 **AI助手** 面板
2. 点击 **总结当前笔记** 按钮
3. 查看 AI 生成的摘要和关键词

### 搜索笔记

1. 切换到 **搜索** 面板
2. 输入关键词
3. 系统会在标题、内容和标签中搜索，按匹配度排序

### 文件夹管理

```bash
# 通过 API 创建文件夹
curl -X POST http://127.0.0.1:8787/api/notes/folders \
  -H "Content-Type: application/json" \
  -d '{"name": "技术文档"}'
```

---

## 设计思路与迭代规划

### 架构设计

```
NoteForge-AI/
├── src/                    # React 前端
│   ├── components/         # UI 组件
│   ├── hooks/             # 自定义 Hooks
│   └── styles/            # 全局样式
├── src-tauri/             # Tauri 桌面端封装
│   └── src/
├── noteforge_server/      # Python 后端
│   ├── app/               # FastAPI 应用
│   │   └── routers/       # API 路由
│   │       ├── notes.py   # 笔记管理
│       ├── ai.py          # AI 服务 (GLM-5.1)
│       ├── search.py      # 搜索服务
│       └── tags.py        # 标签管理
│   └── core/              # 核心配置
└── docs/                  # 文档
```

### 迭代规划

- [x] v1.0.0 - 基础功能
  - [x] Markdown 编辑与预览
  - [x] 笔记 CRUD
  - [x] 文件夹管理
  - [x] AI 标签生成
  - [x] AI 内容总结
  - [x] AI 问答助手
  - [x] 全文搜索

- [ ] v1.1.0 - 增强功能
  - [ ] 语义搜索（向量检索）
  - [ ] 笔记导出（PDF/HTML）
  - [ ] 数据同步（WebDAV/云存储）
  - [ ] 插件系统

- [ ] v1.2.0 - 协作功能
  - [ ] 多用户支持
  - [ ] 笔记分享
  - [ ] 版本历史

---

## 打包与部署指南

### 构建桌面应用

```bash
# 构建生产版本
npm run tauri:build
```

构建产物将位于 `src-tauri/target/release/` 目录：
- Windows: `NoteForge AI.exe`
- macOS: `NoteForge AI.app`
- Linux: `noteforge-ai`

### 后端部署

```bash
cd noteforge_server

# 使用 uvicorn 启动
uvicorn app.main:app --host 127.0.0.1 --port 8787

# 或使用 gunicorn（生产环境）
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Docker 部署（计划中）

```dockerfile
# Dockerfile 示例
FROM python:3.11-slim
WORKDIR /app
COPY noteforge_server/requirements.txt .
RUN pip install -r requirements.txt
COPY noteforge_server/ .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8787"]
```

---

## 贡献指南

我们欢迎所有形式的贡献！

### 提交 Issue

- 使用清晰的标题描述问题
- 提供复现步骤
- 标注环境信息（操作系统、Node版本等）

### 提交 PR

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feat/amazing-feature`
3. 提交更改：`git commit -m 'feat: add amazing feature'`
4. 推送分支：`git push origin feat/amazing-feature`
5. 提交 Pull Request

### 代码规范

- 前端：ESLint + Prettier
- 后端：Black + isort
- 提交信息遵循 [Conventional Commits](https://conventionalcommits.org/)

---

## 开源协议

本项目采用 [MIT 协议](LICENSE) 开源。

```
MIT License

Copyright (c) 2026 NoteForge Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">

**用 AI 赋能你的知识管理**

[GitHub](https://github.com/gitstq/NoteForge-AI) | [Issues](https://github.com/gitstq/NoteForge-AI/issues) | [Releases](https://github.com/gitstq/NoteForge-AI/releases)

</div>
