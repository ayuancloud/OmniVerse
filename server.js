const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let models = [
    {
        id: 'deepseek',
        name: 'DeepSeek',
        modelType: 'deepseek-chat',
        baseUrl: 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK_API_KEY || '',
        avatar: 'bot.png'
    },
    {
        id: 'qwen',
        name: 'Qwen3-235B-A22B',
        modelType: 'Qwen/Qwen3-235B-A22B',
        baseUrl: 'https://api.siliconflow.cn',
        apiKey: process.env.QWEN_API_KEY || '',
        avatar: 'bot1.png'
    },
    {
        id: 'grok',
        name: 'Grok-3',
        modelType: 'grok-3',
        baseUrl: 'https://cn-api.bltcy.cn',
        apiKey: process.env.GROK_API_KEY || '',
        avatar: 'bot3.png'
    },
    {
        id: 'gpt4o-mini',
        name: 'GPT-4o-mini',
        modelType: 'gpt-4o-mini',
        baseUrl: 'https://api.openai.com',
        apiKey: process.env.GPT4O_API_KEY || '',
        avatar: 'bot4.png'
    }
];

let accessLogs = [];
let conversations = new Map(); // 存储对话上下文

function logAccess(ip, question, answer, model) {
    const log = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ip: ip,
        question: question,
        answer: answer,
        model: model
    };
    accessLogs.push(log);
    
    if (accessLogs.length > 1000) {
        accessLogs = accessLogs.slice(-500);
    }
}

app.get('/api/models', (req, res) => {
    res.json({
        success: true,
        models: models.map(m => ({ id: m.id, name: m.name, avatar: m.avatar }))
    });
});

app.post('/api/chat', async (req, res) => {
    const { message, model: modelId, sessionId } = req.body;
    const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    
    if (!message || !modelId) {
        return res.status(400).json({
            success: false,
            error: '消息和模型参数不能为空'
        });
    }

    const selectedModel = models.find(m => m.id === modelId);
    if (!selectedModel) {
        return res.status(400).json({
            success: false,
            error: '选择的模型不存在'
        });
    }

    // 获取或创建会话上下文
    const conversationKey = sessionId || `${clientIP}-${modelId}`;
    if (!conversations.has(conversationKey)) {
        conversations.set(conversationKey, []);
    }
    
    const conversation = conversations.get(conversationKey);
    
    // 添加用户消息到上下文
    conversation.push({
        role: 'user',
        content: message
    });
    
    // 限制上下文长度，保留最近10轮对话
    if (conversation.length > 20) {
        conversation.splice(0, conversation.length - 20);
    }

    try {
        const apiUrl = `${selectedModel.baseUrl.replace(/\/$/, '')}/v1/chat/completions`;
        console.log('Making API request to:', apiUrl);
        console.log('Model type:', selectedModel.modelType);
        console.log('Conversation length:', conversation.length);

        const response = await axios.post(apiUrl, {
            model: selectedModel.modelType,
            messages: conversation,
            max_tokens: 1000,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${selectedModel.apiKey}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        });

        const aiResponse = response.data.choices[0].message.content;
        
        // 添加AI回复到上下文
        conversation.push({
            role: 'assistant',
            content: aiResponse
        });
        
        logAccess(clientIP, message, aiResponse, selectedModel.name);

        res.json({
            success: true,
            response: aiResponse,
            sessionId: conversationKey
        });

    } catch (error) {
        console.error('AI API Error:', error.message);
        console.error('API URL:', `${selectedModel.baseUrl}/v1/chat/completions`);
        console.error('Model Type:', selectedModel.modelType);
        console.error('Error details:', error.response?.data || error.code);
        
        let errorMessage = '抱歉，AI服务暂时不可用，请稍后重试';
        
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
            if (error.response.status === 401) {
                errorMessage = 'API密钥无效，请联系管理员';
            } else if (error.response.status === 429) {
                errorMessage = '请求过于频繁，请稍后重试';
            } else if (error.response.status === 500) {
                errorMessage = 'AI服务器内部错误';
            }
        } else if (error.code === 'ECONNABORTED') {
            errorMessage = '请求超时，请重试';
        }

        logAccess(clientIP, message, `错误: ${errorMessage}`, selectedModel.name);

        res.status(500).json({
            success: false,
            error: errorMessage
        });
    }
});

// 简单的管理员身份验证
let ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
let adminSessions = new Set();

// 生成随机会话token
function generateSessionToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// 验证管理员身份
function verifyAdmin(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token || !adminSessions.has(token)) {
        return res.status(401).json({
            success: false,
            error: '未认证，请先登录'
        });
    }
    next();
}

// 管理员登录
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    
    if (!password || password !== ADMIN_PASSWORD) {
        return res.status(401).json({
            success: false,
            error: '密码错误'
        });
    }
    
    const token = generateSessionToken();
    adminSessions.add(token);
    
    // 设置token过期时间（24小时后自动删除）
    setTimeout(() => {
        adminSessions.delete(token);
    }, 24 * 60 * 60 * 1000);
    
    res.json({
        success: true,
        token: token,
        message: '登录成功'
    });
});

// 修改管理员密码
app.post('/api/admin/change-password', verifyAdmin, (req, res) => {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
        return res.status(400).json({
            success: false,
            error: '当前密码和新密码都是必填的'
        });
    }
    
    if (currentPassword !== ADMIN_PASSWORD) {
        return res.status(401).json({
            success: false,
            error: '当前密码错误'
        });
    }
    
    if (newPassword.length < 6) {
        return res.status(400).json({
            success: false,
            error: '新密码长度至少为6位'
        });
    }
    
    // 更新密码
    ADMIN_PASSWORD = newPassword;
    
    // 清除所有现有会话，要求重新登录
    adminSessions.clear();
    
    res.json({
        success: true,
        message: '密码修改成功，请重新登录'
    });
});

// 管理员登出
app.post('/api/admin/logout', (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
        adminSessions.delete(token);
    }
    res.json({
        success: true,
        message: '登出成功'
    });
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

app.get('/api/admin/models', verifyAdmin, (req, res) => {
    res.json({
        success: true,
        models: models
    });
});

app.post('/api/admin/models', verifyAdmin, (req, res) => {
    const { name, modelType, baseUrl, apiKey, avatar } = req.body;

    if (!name || !modelType || !baseUrl || !apiKey) {
        return res.status(400).json({
            success: false,
            error: '模型名称、模型类型、Base URL和密钥都是必填的'
        });
    }

    const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const newModel = {
        id: id,
        name: name,
        modelType: modelType,
        baseUrl: baseUrl,
        apiKey: apiKey,
        avatar: avatar || 'bot.png'
    };

    models.push(newModel);

    res.json({
        success: true,
        model: newModel
    });
});

app.delete('/api/admin/models/:id', verifyAdmin, (req, res) => {
    const { id } = req.params;
    const initialLength = models.length;
    
    models = models.filter(m => m.id !== id);
    
    if (models.length < initialLength) {
        res.json({
            success: true,
            message: '模型删除成功'
        });
    } else {
        res.status(404).json({
            success: false,
            error: '模型不存在'
        });
    }
});

app.get('/api/admin/logs', verifyAdmin, (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const start = (page - 1) * limit;
    const end = start + limit;
    
    const paginatedLogs = accessLogs
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(start, end);

    res.json({
        success: true,
        logs: paginatedLogs,
        total: accessLogs.length,
        page: page,
        totalPages: Math.ceil(accessLogs.length / limit)
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`OmniVerse服务器运行在端口 ${PORT}`);
    console.log(`访问地址: http://localhost:${PORT}`);
    console.log(`管理后台: http://localhost:${PORT}/admin`);
});
