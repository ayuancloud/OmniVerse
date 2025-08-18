let isDarkMode = localStorage.getItem('theme') === 'dark';
let currentSessionId = null;
let availableModels = [];

setTheme(isDarkMode);

// 页面加载时获取模型列表
document.addEventListener('DOMContentLoaded', async () => {
    await loadModels();
});

async function loadModels() {
    try {
        const response = await fetch('/api/models');
        const data = await response.json();
        
        if (data.success && data.models) {
            availableModels = data.models;
            updateModelSelector();
        }
    } catch (error) {
        console.error('Failed to load models:', error);
        // 如果加载失败，使用默认模型
        availableModels = [
            { id: 'deepseek', name: 'DeepSeek', avatar: 'bot.png' }
        ];
        updateModelSelector();
    }
}

function updateModelSelector() {
    const modelSelector = document.getElementById('modelSelector');
    modelSelector.innerHTML = '';
    
    availableModels.forEach(model => {
        const option = document.createElement('option');
        option.value = model.id;
        option.textContent = model.name;
        modelSelector.appendChild(option);
    });
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    setTheme(isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

function setTheme(dark) {
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
    const themeIcon = document.getElementById('theme-icon');
    themeIcon.setAttribute('d', dark ? 
        'M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z' : 
        'M12 3V4M12 20V21M18.364 5.636L17.656 6.344M6.344 17.656L5.636 18.364M21 12H20M4 12H3M18.364 18.364L17.656 17.656M6.344 6.344L5.636 5.636');
}

async function sendMessage() {
    const input = document.getElementById('input');
    const message = input.value.trim();
    if (!message) return;


    const btn = document.getElementById('sendBtn');
    btn.disabled = true;
    btn.innerHTML = '<div class="loading"></div>';

    // 添加用户消息
    addMessage(message, true);
    // 添加AI消息占位符
    addMessage('', false);
    input.value = '';

    try {
        const modelSelector = document.getElementById('modelSelector');
        const selectedModel = modelSelector.value;
        
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                model: selectedModel,
                sessionId: currentSessionId
            })
        });

        const data = await response.json();
        
        if (data.success) {
            currentSessionId = data.sessionId;
            updateLastMessage(data.response);
        } else {
            updateLastMessage(`错误: ${data.error}`);
        }

    } catch (error) {
        console.error('Error:', error);
        updateLastMessage('请求出错，请稍后再试');
    }

    btn.disabled = false;
    btn.textContent = '发送';
}

function addMessage(content, isUser) {
    const container = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : ''}`;
    
    if (!isUser) {
        const modelSelector = document.getElementById('modelSelector');
        const selectedModel = modelSelector.value;
        
        // 从availableModels中找到对应的头像
        const modelInfo = availableModels.find(m => m.id === selectedModel);
        const avatarImage = modelInfo ? modelInfo.avatar : 'bot.png';
        
        messageDiv.innerHTML = `
            <div class="avatar" style="background-image: url('${avatarImage}'); background-color: white;"></div>
            <div class="content">${content}</div>
        `;
    } else {
        messageDiv.innerHTML = `<div class="content">${content}</div>`;
    }
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function updateLastMessage(content) {
    const contents = document.querySelectorAll('.content');
    const lastContent = contents[contents.length - 1];
    
    // 配置 marked 选项
    marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: false,
        mangle: false,
        sanitize: false,
        smartLists: true,
        smartypants: true,
        xhtml: false
    });
    
    // 渲染 Markdown
    lastContent.innerHTML = marked.parse(content);
    
    // 渲染LaTeX数学公式 - 支持行内和块级公式
    // 处理块级公式 $$...$$ 
    lastContent.innerHTML = lastContent.innerHTML.replace(/\$\$(.*?)\$\$/gs, (match, latex) => {
        try {
            return katex.renderToString(latex.trim(), {
                displayMode: true,
                throwOnError: false
            });
        } catch (e) {
            console.error('KaTeX block rendering error:', e);
            return match;
        }
    });
    
    // 处理行内公式 $...$
    lastContent.innerHTML = lastContent.innerHTML.replace(/\$([^$\n]+?)\$/g, (match, latex) => {
        try {
            return katex.renderToString(latex.trim(), {
                displayMode: false,
                throwOnError: false
            });
        } catch (e) {
            console.error('KaTeX inline rendering error:', e);
            return match;
        }
    });
    
    // 自动滚动到底部
    const container = document.getElementById('chatContainer');
    container.scrollTop = container.scrollHeight;
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}
