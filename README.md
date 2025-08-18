# OmniVerse

OmniVerse 是一个现代化的 AI 对话平台，支持多模型切换、Markdown 渲染和后台管理。

## 特性
- 多模型支持与切换
- 深色 / 浅色主题
- Markdown 与 LaTeX 渲染
- 模型与访问日志后台管理
- 通过 Base URL 灵活接入不同 AI 服务

## 快速开始
```bash
npm install
npm start
```
访问 `http://localhost:3000`，后台地址 `http://localhost:3000/admin`。

## 模型配置
在后台“添加AI模型”时需要提供：
- 模型名称
- 模型类型
- Base URL（例如 `https://api.openai.com`）
- API 密钥
- 头像文件名（可选）

## 许可证
本项目使用 MIT License。

