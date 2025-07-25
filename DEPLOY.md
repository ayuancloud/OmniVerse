# OmniVerse AI对话平台

一个简洁现代的AI对话网站，支持多模型切换、主题切换和后台管理。

## 功能特性

- ✅ 一问一答式AI对话
- ✅ 多AI模型支持和切换
- ✅ 黑白主题切换
- ✅ 现代简洁的UI设计
- ✅ 后台模型管理
- ✅ 访问日志记录
- ✅ 移动端适配
- ✅ Ubuntu系统兼容

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量（可选）

创建 `.env` 文件：
```bash
PORT=3000
OPENAI_API_KEY=你的OpenAI密钥
```

### 3. 启动服务

```bash
npm start
```

### 4. 访问网站

- 主页: http://localhost:3000
- 管理后台: http://localhost:3000/admin

## Ubuntu部署

### 系统要求

- Ubuntu 18.04+ 
- Node.js 14+
- npm 6+

### 安装Node.js (Ubuntu)

```bash
# 更新系统
sudo apt update

# 安装Node.js和npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version
```

### 部署步骤

```bash
# 1. 克隆项目到服务器
git clone <你的仓库地址>
cd omniverse-chat

# 2. 安装依赖
npm install

# 3. 配置环境变量（可选）
echo "PORT=3000" > .env
echo "OPENAI_API_KEY=你的密钥" >> .env

# 4. 启动服务
npm start
```

### 使用PM2部署（推荐）

```bash
# 安装PM2
sudo npm install -g pm2

# 启动应用
pm2 start server.js --name omniverse

# 设置开机自启
pm2 startup
pm2 save
```

## 后台管理

访问 `/admin` 路径进入管理后台：

1. **模型管理**: 添加/删除AI模型配置
2. **访问日志**: 查看用户对话记录和统计
3. **实时同步**: 模型配置实时同步到前端

## API接口

### 获取模型列表
```
GET /api/models
```

### 发送对话
```
POST /api/chat
{
  "message": "用户消息",
  "model": "模型ID"
}
```

### 管理接口
```
GET /api/admin/models     # 获取所有模型
POST /api/admin/models    # 添加模型
DELETE /api/admin/models/:id  # 删除模型
GET /api/admin/logs       # 获取访问日志
```

## 技术栈

- **前端**: HTML5 + CSS3 + JavaScript (原生)
- **后端**: Node.js + Express
- **存储**: 内存存储（访问日志）
- **部署**: Ubuntu + PM2

## 项目结构

```
├── server.js           # 后端服务器
├── package.json        # 项目配置
├── public/            # 前端文件
│   ├── index.html     # 主页面
│   ├── style.css      # 样式文件
│   └── script.js      # 前端脚本
├── admin/             # 管理后台
│   └── index.html     # 管理界面
└── README.md          # 项目说明
```

## 开发说明

### 添加新的AI模型

1. 进入管理后台 `/admin`
2. 填写模型信息：
   - 模型名称（显示名称）
   - API地址（兼容OpenAI格式）
   - API密钥
3. 点击添加，模型会实时同步到前端

### 自定义主题

修改 `public/style.css` 中的CSS变量：

```css
:root {
    --primary-color: #007bff;  /* 主色调 */
    --bg-color: #ffffff;       /* 背景色 */
    /* ... 其他变量 */
}
```

## 许可证

MIT License