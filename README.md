# OmniVerse万物聚合体

<div align="center">

![OmniVerse Logo](public/bot.png)

**🌟 现代化AI对话平台 | 多模型集成 | 智能对话 | 企业级安全**

[![Version](https://img.shields.io/badge/version-v2.2-blue.svg)](https://github.com/ayuancloud/omniverse)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/express-4.x-lightgrey.svg)](https://expressjs.com/)

[在线演示](https://chat.ayuan.cloud) • [完整文档](README.md) • [更新日志](#更新日志) • [快速开始](#快速开始)

</div>

---

## 📖 项目简介

OmniVerse万物聚合体是一个功能强大的现代化AI对话平台，支持多个AI模型的无缝切换和管理。项目采用前后端分离架构，提供了完整的用户对话体验、管理后台、以及企业级的安全保护机制。

### ✨ 核心特性

🔐 **企业级安全**
- 后台身份验证与权限管理
- API密钥后端加密存储，前端完全隔离
- 在线密码修改功能
- Token会话管理机制

🧠 **智能对话系统**
- 多模型上下文记忆
- 连续对话支持
- 自动上下文管理
- 会话状态持久化

🎨 **现代化界面**
- 响应式设计适配所有设备
- 深色/浅色主题切换
- 优雅的滚动条样式
- 美化的模型选择器

📊 **功能丰富**
- 动态模型管理
- Markdown内容渲染
- LaTeX数学公式支持
- 访问日志记录
- 实时错误监控

## 🏗️ 技术架构

```
OmniVerse v2.2 架构图
┌─────────────────────────────────────────────────────────┐
│                    前端层 (Frontend)                      │
├─────────────────────────────────────────────────────────┤
│ • HTML5 + CSS3 + 原生JavaScript                         │
│ • Marked.js (Markdown渲染)                              │
│ • KaTeX (LaTeX数学公式)                                 │
│ • 响应式UI设计                                          │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                   后端层 (Backend)                       │
├─────────────────────────────────────────────────────────┤
│ • Node.js + Express.js                                  │
│ • RESTful API设计                                       │
│ • JWT Token认证                                         │
│ • 上下文记忆管理                                        │
│ • 动态模型配置                                          │
│ • 访问日志系统                                          │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                 AI服务集成层 (AI APIs)                   │
├─────────────────────────────────────────────────────────┤
│ • DeepSeek API        • Qwen API (SiliconFlow)          │
│ • Grok API           • GPT-4o-mini API                  │
│ • 支持自定义AI服务商添加                                │
└─────────────────────────────────────────────────────────┘
```

## 🚀 快速开始

### 方法一：自动部署脚本

```bash
# 1. 克隆项目
git clone https://github.com/ayuancloud/omniverse.git
cd omniverse

# 2. 运行自动部署脚本
chmod +x deploy.sh
./deploy.sh

# 3. 访问应用
# http://localhost:3000 (主页)
# http://localhost:3000/admin (管理后台)
```

### 方法二：手动部署

```bash
# 1. 克隆并安装依赖
git clone https://github.com/ayuancloud/omniverse.git
cd omniverse
npm install

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入你的配置

# 3. 启动服务
npm start
# 或使用PM2 (推荐生产环境)
pm2 start server.js --name omniverse
```

### 环境变量配置

复制 `.env.example` 为 `.env` 并配置以下参数：

```bash
# 服务器配置
PORT=3000
NODE_ENV=production

# 管理员密码（请务必修改）
ADMIN_PASSWORD=your-secure-admin-password

# AI服务API密钥（获取方式见下方说明）
DEEPSEEK_API_KEY=your-deepseek-api-key
QWEN_API_KEY=your-qwen-api-key
GROK_API_KEY=your-grok-api-key
GPT4O_API_KEY=your-gpt4o-api-key
```

## 🔑 获取API密钥

### DeepSeek API
1. 访问 [DeepSeek开放平台](https://platform.deepseek.com/)
2. 注册账号并实名认证
3. 在控制台创建API密钥

### Qwen API (SiliconFlow)
1. 访问 [SiliconFlow平台](https://siliconflow.cn/)
2. 注册并完成认证
3. 获取API密钥

### Grok API 
1. 访问相应的Grok API服务提供商
2. 按照要求注册并获取密钥

### GPT-4o-mini API
1. 访问 [OpenAI官网](https://openai.com/) 或代理服务商
2. 注册账号并充值
3. 在API页面获取密钥

## 📋 系统要求

### 最低配置
- **操作系统**: Ubuntu 18.04+ / CentOS 7+ / Windows 10+
- **Node.js**: 16.0.0 或更高版本
- **内存**: 1GB RAM
- **存储**: 10GB 可用空间

### 推荐配置
- **操作系统**: Ubuntu 20.04 LTS
- **Node.js**: 18.0.0 LTS
- **内存**: 2GB RAM 或更多
- **存储**: 20GB 可用空间

## 🔐 安全特性

### API密钥保护机制
本项目采用严格的后端代理模式保护您的API密钥：

```
用户浏览器 → 您的服务器 → AI服务商API
     ↑            ↑            ↑
  只看到您的域名  存储API密钥   实际AI服务
```

**安全保障:**
- ✅ API密钥完全存储在服务器端
- ✅ 前端JavaScript无法访问任何密钥
- ✅ 使用环境变量管理敏感信息
- ✅ 支持动态密钥管理
- ✅ 网络请求完全隔离

## 🎯 功能特性

### 🗣️ 智能对话
- **多模型切换**: 支持DeepSeek、Qwen、Grok、GPT等多个AI模型
- **上下文记忆**: 每个用户+模型组合维护独立的对话上下文
- **连续对话**: 支持长时间连续对话，AI记住之前的内容
- **智能管理**: 自动管理对话历史，保持最佳性能

### 🎨 用户界面
- **响应式设计**: 完美适配桌面、平板、手机设备
- **主题切换**: 支持深色/浅色主题，用户偏好本地存储
- **现代UI**: 美化的滚动条、选择器等界面元素
- **流畅交互**: 优雅的动画和过渡效果

### 📊 管理后台
- **安全认证**: 密码保护的管理界面
- **模型管理**: 动态添加、删除、配置AI模型
- **访问日志**: 查看用户对话记录和系统访问日志
- **实时统计**: 模型使用量、访问次数等数据统计

### 🔧 技术特性
- **Markdown支持**: 完整的Markdown语法渲染
- **数学公式**: LaTeX行内和块级公式支持
- **错误处理**: 详细的错误日志和用户友好提示
- **性能优化**: 支持PM2集群部署，高并发处理

## 📚 使用说明

### 基础使用
1. **启动服务**: 按照快速开始章节部署项目
2. **访问主页**: 在浏览器访问 `http://localhost:3000`
3. **选择模型**: 使用页面上的下拉菜单选择AI模型
4. **开始对话**: 在输入框中输入消息并发送

### 管理后台
1. **访问后台**: 浏览器访问 `http://localhost:3000/admin`
2. **登录**: 使用您在 `.env` 中设置的管理员密码
3. **管理模型**: 添加、删除或修改AI模型配置
4. **查看日志**: 监控用户访问和对话记录

### 添加自定义AI模型
在管理后台可以轻松添加新的AI模型：
1. 点击"添加AI模型"
2. 填写模型信息：
   - **模型名称**: 显示给用户的名称
   - **模型类型**: API调用时使用的模型标识
   - **API地址**: 完整的API端点URL
   - **API密钥**: 从服务商获取的密钥
   - **头像**: 模型头像文件名

## 🛠️ 开发指南

### 本地开发
```bash
# 克隆项目
git clone https://github.com/ayuancloud/omniverse.git
cd omniverse

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件

# 启动开发服务器
npm run dev
```

### 项目结构
```
omniverse/
├── public/           # 前端静态文件
│   ├── index.html   # 主页面
│   ├── script.js    # 前端JavaScript
│   ├── style.css    # 样式文件
│   └── bot*.png     # 模型头像图片
├── admin/           # 管理后台
│   └── index.html   # 管理界面
├── server.js        # 后端服务器
├── package.json     # 项目配置
├── .env.example     # 环境变量模板
├── .gitignore       # Git忽略文件
└── README.md       # 项目说明
```

### 自定义主题
修改 `public/style.css` 中的CSS变量来自定义主题：

```css
:root {
    --bg-color: #ffffff;
    --text-color: #1a1a1a;
    --primary-color: #147EFB;
    --secondary-color: #f5f5f5;
    --border-color: #e0e0e0;
}
```

## 🔧 常见问题

### Q: 如何修改管理员密码？
A: 在 `.env` 文件中修改 `ADMIN_PASSWORD` 并重启服务，或在管理后台在线修改。

### Q: API调用失败怎么办？
A: 
1. 检查API密钥是否正确
2. 确认API余额充足
3. 查看服务器日志：`pm2 logs omniverse`

### Q: 如何添加新的AI模型？
A: 在管理后台使用"添加AI模型"功能，或直接修改 `server.js` 中的 `models` 数组。

### Q: 支持哪些设备？
A: 支持所有现代浏览器和设备，包括桌面、平板、手机。

## 🔄 更新日志

### v2.2 (2025-07-24) - 开源发布版
**🎉 开源发布**
- ✅ 提供完整的环境变量模板
- ✅ 完善的文档和使用说明

**🐛 Bug修复**
- ✅ 修复管理后台显示问题
- ✅ 增强API调试功能
- ✅ 优化错误处理机制

**🎨 UI优化**
- ✅ 美化聊天框滚动条
- ✅ 重新设计模型选择器
- ✅ 优化移动端体验

## 🤝 贡献指南

我们欢迎任何形式的贡献！

### 贡献方式
1. **报告问题**: 在 [Issues](https://github.com/ayuancloud/OmniVerse/issues) 页面报告bug或提出建议
2. **功能请求**: 提出新功能的想法和需求
3. **代码贡献**: 提交Pull Request修复问题或添加功能
4. **文档改进**: 帮助完善文档和说明

### 开发流程
1. Fork 项目到您的GitHub账户
2. 创建特性分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'Add amazing feature'`
4. 推送分支: `git push origin feature/amazing-feature`
5. 创建 Pull Request

### 开发规范
- 遵循现有代码风格
- 添加适当的注释
- 更新相关文档
- 确保功能正常工作

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。您可以自由使用、修改和分发本项目。

## 🙏 致谢

感谢以下开源项目和服务：
- [Express.js](https://expressjs.com/) - 后端框架
- [Marked.js](https://marked.js.org/) - Markdown解析
- [KaTeX](https://katex.org/) - 数学公式渲染
- [PM2](https://pm2.keymetrics.io/) - 进程管理
- 各AI服务提供商的支持

## 👨‍💻 作者

**阿远 (AYuan)**
- 🌐 网站: [ayuan.cloud](https://ayuan.cloud)
- 📧 邮箱: [ayuancloud@163.com](mailto:ayuancloud@163.com)
- 🐙 GitHub: [@ayuancloud](https://github.com/ayuancloud)

## 📞 支持

如果您在使用过程中遇到问题：

1. **搜索问题**: 在 [Issues](https://github.com/ayuancloud/omniverse/issues) 中搜索
2. **提交问题**: 创建新的 Issue 描述问题
3. **联系作者**: 通过邮箱或GitHub联系

## ⭐ Star 历史

如果这个项目对您有帮助，请给它一个 ⭐️！

[![Stargazers over time](https://starchart.cc/ayuancloud/OmniVerse.svg)](https://starchart.cc/ayuancloud/OmniVerse)

---

<div align="center">

**🌟 如果您觉得这个项目有用，请给它一个星标！**

**Built with ❤️ by [AYuan](https://ayuan.cloud)**

*OmniVerse万物聚合体 - 让AI对话更简单、更安全、更智能*

[![Star](https://img.shields.io/github/stars/ayuancloud/omniverse?style=social)](https://github.com/ayuancloud/Omniverse)
[![Fork](https://img.shields.io/github/forks/ayuancloud/omniverse?style=social)](https://github.com/ayuancloud/OmniVerse)
[![Watch](https://img.shields.io/github/watchers/ayuancloud/omniverse?style=social)](https://github.com/ayuancloud/OmniVerse)

</div>

🧠 **智能对话系统**
- 多模型上下文记忆
- 连续对话支持
- 自动上下文管理
- 会话状态持久化

🎨 **现代化界面**
- 响应式设计适配
- 深色/浅色主题切换
- 优雅的滚动条样式
- 美化的模型选择器

📊 **功能丰富**
- 动态模型管理
- Markdown内容渲染
- LaTeX数学公式支持
- 访问日志记录
- 实时错误监控

## 🏗️ 技术架构

```
OmniVerse v2.2 架构图
┌─────────────────────────────────────────────────────────┐
│                    前端层 (Frontend)                      │
├─────────────────────────────────────────────────────────┤
│ • HTML5 + CSS3 + 原生JavaScript                         │
│ • Marked.js (Markdown渲染)                              │
│ • KaTeX (LaTeX数学公式)                                 │
│ • 响应式UI设计                                          │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                   后端层 (Backend)                       │
├─────────────────────────────────────────────────────────┤
│ • Node.js + Express.js                                  │
│ • RESTful API设计                                       │
│ • JWT Token认证                                         │
│ • 上下文记忆管理                                        │
│ • 动态模型配置                                          │
│ • 访问日志系统                                          │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                 AI服务集成层 (AI APIs)                   │
├─────────────────────────────────────────────────────────┤
│ • DeepSeek API        • Qwen API (SiliconFlow)          │
│ • Grok API           • GPT-4o-mini API                  │
│ • 支持自定义AI服务商添加                                │
└─────────────────────────────────────────────────────────┘
```

## 🛠️ 技术栈

### 前端技术
- **核心**: HTML5, CSS3, JavaScript (ES6+)
- **渲染**: Marked.js (Markdown), KaTeX (数学公式)
- **UI设计**: 响应式设计, CSS Grid/Flexbox
- **主题**: 深色/浅色模式切换

### 后端技术
- **运行时**: Node.js (≥16.0.0)
- **框架**: Express.js 4.x
- **HTTP客户端**: Axios
- **中间件**: CORS, Express.json
- **认证**: 自定义Token认证

### 部署运维
- **进程管理**: PM2
- **反向代理**: Nginx (可选)
- **SSL**: Let's Encrypt
- **操作系统**: Ubuntu 18.04+ / CentOS 7+

## 🚀 快速部署

### 方法一：自动部署脚本

```bash
# 1. 下载项目
git clone https://github.com/ayuancloud/omniverse.git
cd omniverse

# 2. 运行自动部署脚本
chmod +x deploy.sh
./deploy.sh

# 3. 访问应用
# http://your-domain.com
# http://your-domain.com/admin (管理后台)
```

### 方法二：手动部署

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，配置端口和API密钥

# 3. 启动服务
npm start
# 或使用PM2
pm2 start server.js --name omniverse
```

### 环境变量配置

```bash
# .env 文件示例
PORT=3000
NODE_ENV=production
ADMIN_PASSWORD=your-secure-password

# AI服务API密钥 (可选，也可在管理后台配置)
DEEPSEEK_API_KEY=your-deepseek-key
QWEN_API_KEY=your-qwen-key
GROK_API_KEY=your-grok-key
GPT4O_API_KEY=your-gpt4o-key
```

## 📋 系统要求

### 最低配置
- **操作系统**: Ubuntu 18.04 LTS / CentOS 7+
- **CPU**: 1核心
- **内存**: 1GB RAM
- **存储**: 10GB 可用空间
- **网络**: 稳定的互联网连接

### 推荐配置
- **操作系统**: Ubuntu 20.04 LTS / 22.04 LTS
- **CPU**: 2核心或更多
- **内存**: 2GB RAM 或更多
- **存储**: 20GB 可用空间
- **网络**: 带宽 ≥ 10Mbps

## 🎯 功能特性详解

### 🔐 安全认证系统
- **管理员身份验证**: 密码登录 + Token会话管理
- **API密钥保护**: 所有密钥存储在后端，前端无法访问
- **权限控制**: 管理API需要身份验证
- **会话管理**: 支持在线密码修改，修改后自动清除所有会话

### 🧠 智能对话功能
- **上下文记忆**: 每个用户+模型组合维护独立对话上下文
- **自动管理**: 限制上下文长度，保持最近20轮对话
- **会话持久化**: 对话状态在服务器重启后保持
- **模型切换**: 不同模型间对话上下文独立

### 🎨 用户界面设计
- **响应式布局**: 适配桌面、平板、手机设备
- **主题切换**: 深色/浅色模式，用户偏好本地存储
- **美化滚动条**: 自定义样式的聊天区域滚动条
- **优雅选择器**: 美化的模型选择下拉框，支持hover效果

### 📊 管理后台功能
- **模型管理**: 动态添加/删除AI模型配置
- **访问日志**: 查看用户对话记录和系统访问日志
- **统计信息**: 模型数量、访问记录统计
- **配置管理**: 在线修改系统配置

### 🔧 技术特性
- **Markdown渲染**: 支持完整的Markdown语法
- **数学公式**: LaTeX行内和块级公式渲染
- **错误处理**: 详细的错误日志和用户友好的错误提示
- **API代理**: 后端代理AI服务请求，保护API密钥

## 📚 API文档

### 公开API

#### 获取模型列表
```http
GET /api/models
```

**响应示例:**
```json
{
  "success": true,
  "models": [
    {
      "id": "deepseek",
      "name": "DeepSeek",
      "avatar": "bot.png"
    }
  ]
}
```

#### 发送对话消息
```http
POST /api/chat
Content-Type: application/json

{
  "message": "你好",
  "model": "deepseek",
  "sessionId": "optional-session-id"
}
```

### 管理API (需要认证)

#### 管理员登录
```http
POST /api/admin/login
Content-Type: application/json

{
  "password": "admin-password"
}
```

#### 添加模型
```http
POST /api/admin/models
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "GPT-4",
  "modelType": "gpt-4",
  "apiUrl": "https://api.openai.com/v1/chat/completions",
  "apiKey": "sk-xxx",
  "avatar": "gpt4.png"
}
```

## 🔐 API安全性保障

### 安全架构设计

**问题**: 如何确保前端不会暴露API密钥？

**解答**: 本项目采用了严格的后端代理模式来保护API密钥：

```
用户浏览器 → 你的服务器 → AI服务商API
     ↑              ↑              ↑
  只看到你的域名   存储API密钥    实际的AI服务
```

### 具体保护机制

1. **后端存储**: 所有API密钥存储在服务器端的`server.js`文件中
2. **环境变量**: 密钥通过`.env`文件管理，不会出现在前端代码中
3. **代理请求**: 前端只向你的服务器发送请求，服务器代理转发到AI服务商
4. **网络隔离**: 浏览器无法直接访问AI服务商的API
5. **源码保护**: 前端JavaScript代码中不包含任何API密钥信息

### 验证方法

您可以通过以下方式验证API密钥的安全性：

```bash
# 1. 查看前端源码 - 不会找到任何API密钥
curl -s http://your-domain.com/script.js | grep -i "api.*key"

# 2. 查看网络请求 - 只会看到到你服务器的请求
# 在浏览器F12网络面板中，所有请求都指向你的域名

# 3. 服务器日志显示代理请求
pm2 logs omniverse | grep "Making API request"
```

## 🔧 自定义配置

### 添加新的AI模型

1. **通过管理后台添加** (推荐)
   - 访问 `/admin` 管理后台
   - 使用"添加AI模型"功能
   - 填写模型信息并保存

2. **直接修改代码**
   ```javascript
   // server.js 中的 models 数组
   {
       id: 'custom-model',
       name: '自定义模型',
       modelType: 'custom-model-type',
       apiUrl: 'https://api.example.com/v1/chat/completions',
       apiKey: process.env.CUSTOM_API_KEY,
       avatar: 'custom.png'
   }
   ```

### 自定义主题样式

修改 `public/style.css` 中的CSS变量：

```css
:root {
    --bg-color: #ffffff;
    --text-color: #1a1a1a;
    --primary-color: #147EFB;
    --secondary-color: #f5f5f5;
    --border-color: #e0e0e0;
}
```

## 📈 性能优化

### 服务器优化
```bash
# 启用PM2集群模式
pm2 start server.js -i max --name omniverse

# 增加Node.js内存限制
pm2 start server.js --node-args="--max-old-space-size=2048"
```

### Nginx配置优化
```nginx
# 启用gzip压缩
gzip on;
gzip_types text/plain text/css application/json application/javascript;

# 静态文件缓存
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🔍 故障排除

### 常见问题

**Q: API调用返回500错误**
```bash
# 查看详细错误日志
pm2 logs omniverse --lines 50

# 验证API密钥有效性
curl -H "Authorization: Bearer your-api-key" https://api.deepseek.com/v1/models
```

**Q: 管理后台无法访问**
```bash
# 检查服务状态
pm2 status

# 重启服务
pm2 restart omniverse

# 检查防火墙
sudo ufw status
```

**Q: 前端样式异常**
```bash
# 清除浏览器缓存
# Ctrl+F5 (Windows) 或 Cmd+Shift+R (Mac)

# 检查静态文件服务
curl -I http://localhost:3000/style.css
```

### 日志分析
```bash
# 查看应用日志
pm2 logs omniverse

# 查看系统日志
sudo journalctl -u pm2-root -f

# 查看Nginx日志
sudo tail -f /var/log/nginx/error.log
```

## 📊 监控和维护

### 系统监控
```bash
# PM2监控面板
pm2 monit

# 系统资源使用
htop

# 磁盘使用情况
df -h

# 网络连接状态
netstat -tulpn | grep :3000
```

### 定期维护
```bash
# 每日备份脚本
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf /backup/omniverse_$DATE.tar.gz /var/www/omniverse
find /backup -name "omniverse_*.tar.gz" -mtime +7 -delete
```

## 🔄 更新日志

### v2.2 (2025-07-24) - 最终上线版本
**🐛 Bug修复**
- ✅ 修复管理后台显示"API"而非"URL地址"的问题
- ✅ 增强API调试日志记录功能
- ✅ 优化500错误的处理和诊断机制
- ✅ 验证DeepSeek等API的endpoint配置

**🎨 UI优化**
- ✅ 美化聊天框滚动条样式，支持主题色彩
- ✅ 重新设计模型选择器，增加hover效果和自定义箭头
- ✅ 优化移动端响应式布局
- ✅ 统一组件圆角和阴影效果

**🔧 技术改进**
- ✅ 增强错误处理和日志记录
- ✅ 改进API请求调试信息
- ✅ 优化用户体验和界面交互
- ✅ 完善API安全性文档说明

### v2.1 (2024-07)
**🔐 安全增强**
- 管理后台身份验证系统
- 在线密码修改功能
- Token会话管理机制

**🧠 智能对话**
- 上下文记忆系统
- 连续对话支持
- 自动上下文管理

**🎨 界面优化**
- 动态模型管理
- 数学公式渲染
- 响应式设计改进

## 🎯 项目完整总结

### 核心功能实现
✅ **对话系统**: 完整的一问一答AI对话功能  
✅ **模型切换**: 支持多个AI模型动态选择  
✅ **主题切换**: 深色/浅色主题模式  
✅ **管理后台**: 完整的模型和日志管理系统  
✅ **安全认证**: 企业级的身份验证和权限控制  
✅ **上下文记忆**: 智能的连续对话支持  
✅ **响应式设计**: 完美适配各种设备  

### 技术架构优势
- **前后端分离**: 清晰的架构设计，易于维护扩展
- **API安全**: 后端代理模式，完全保护API密钥
- **性能优化**: PM2集群部署，支持高并发访问
- **错误处理**: 完善的错误监控和调试机制
- **部署友好**: 自动化部署脚本，支持Ubuntu云服务器

### 生产就绪特性
- **稳定性**: 经过多轮测试优化，功能稳定可靠
- **安全性**: 多层次安全防护，符合生产环境要求
- **可扩展**: 模块化设计，易于添加新功能和AI模型
- **维护性**: 详细的文档和日志，便于运维管理
- **用户体验**: 现代化UI设计，交互流畅自然

## 🤝 贡献指南

我们欢迎社区贡献！请遵循以下步骤：

1. **Fork项目** - 点击右上角的Fork按钮
2. **创建特性分支** - `git checkout -b feature/new-feature`
3. **提交更改** - `git commit -am 'Add new feature'`
4. **推送分支** - `git push origin feature/new-feature`
5. **创建Pull Request** - 在GitHub上创建PR

### 开发规范
- 遵循现有的代码风格
- 添加适当的注释
- 更新相关文档
- 测试新功能

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 👨‍💻 作者信息

**阿远 (AYuan)**
- 网站: [ayuan.cloud](https://ayuan.cloud)
- GitHub: [@your-github](https://github.com/ayuancloud)

## 🙏 致谢

感谢以下开源项目和服务提供商：
- [Express.js](https://expressjs.com/) - Web应用框架
- [Marked.js](https://marked.js.org/) - Markdown解析器
- [KaTeX](https://katex.org/) - 数学公式渲染
- [DeepSeek](https://www.deepseek.com/) - AI服务提供
- [PM2](https://pm2.keymetrics.io/) - 进程管理器

## 📞 技术支持

如果您在部署或使用过程中遇到问题：

1. **查看文档** - [完整部署文档](doit.md)
2. **检查日志** - `pm2 logs omniverse`
3. **提交Issue** - [GitHub Issues](https://github.com/your-repo/omniverse/issues)
4. **联系作者** - 访问 [ayuan.cloud](https://ayuan.cloud)

---

<div align="center">

**🌟 如果这个项目对您有帮助，请给它一个星标！**

[![Star](https://img.shields.io/github/stars/ayuancloud/omniverse?style=social)](https://github.com/your-repo/omniverse)

**Built with ❤️ by [AYuan](https://ayuan.cloud)**

*OmniVerse万物聚合体 - 让AI对话更简单、更安全、更智能*

</div>