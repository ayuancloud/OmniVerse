#!/bin/bash

# OmniVerse 一键部署脚本 (Ubuntu)

echo "=== OmniVerse AI对话平台部署脚本 ==="
echo ""

# 检查系统
if [[ "$OSTYPE" != "linux-gnu"* ]]; then
    echo "❌ 此脚本仅支持Linux系统"
    exit 1
fi

# 检查是否为Ubuntu
if ! command -v apt &> /dev/null; then
    echo "❌ 此脚本仅支持Ubuntu系统"
    exit 1
fi

echo "✅ 系统检查通过"

# 更新系统
echo "📦 更新系统包..."
sudo apt update

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "📦 安装Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "✅ Node.js已安装: $(node --version)"
fi

# 检查npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm未安装"
    exit 1
else
    echo "✅ npm已安装: $(npm --version)"
fi

# 安装项目依赖
echo "📦 安装项目依赖..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ 依赖安装成功"
else
    echo "❌ 依赖安装失败"
    exit 1
fi

# 检查是否安装PM2
if ! command -v pm2 &> /dev/null; then
    echo "📦 安装PM2..."
    sudo npm install -g pm2
    echo "✅ PM2安装完成"
else
    echo "✅ PM2已安装"
fi

# 配置环境变量
if [ ! -f .env ]; then
    echo "⚙️  配置环境变量..."
    echo "PORT=3000" > .env
    echo "NODE_ENV=production" >> .env
    echo "✅ 环境变量配置完成"
fi

# 测试服务器启动
echo "🧪 测试服务器启动..."
timeout 10s node server.js &
SERVER_PID=$!
sleep 5

if kill -0 $SERVER_PID 2>/dev/null; then
    echo "✅ 服务器测试启动成功"
    kill $SERVER_PID
else
    echo "❌ 服务器启动失败"
    exit 1
fi

# 使用PM2启动服务
echo "🚀 使用PM2启动服务..."
pm2 stop omniverse 2>/dev/null || true
pm2 delete omniverse 2>/dev/null || true
pm2 start server.js --name omniverse

# 设置开机自启
echo "⚙️  配置开机自启..."
pm2 startup | grep sudo | bash
pm2 save

# 检查服务状态
sleep 3
if pm2 list | grep -q "omniverse.*online"; then
    echo ""
    echo "🎉 部署成功！"
    echo ""
    echo "📍 访问地址:"
    echo "   主页: http://localhost:3000"
    echo "   管理后台: http://localhost:3000/admin"
    echo ""
    echo "🛠️  管理命令:"
    echo "   查看状态: pm2 status"
    echo "   查看日志: pm2 logs omniverse"
    echo "   重启服务: pm2 restart omniverse"
    echo "   停止服务: pm2 stop omniverse"
    echo ""
    echo "⚠️  注意: 请在管理后台配置您的AI模型API密钥"
else
    echo "❌ 服务启动失败，请检查日志："
    pm2 logs omniverse
    exit 1
fi