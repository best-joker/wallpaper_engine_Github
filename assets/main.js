// GitHub动态壁纸 - 重新设计版
// 完整的主题切换功能实现

let currentTheme = 'auto';
let currentTime = new Date();

// Wallpaper Engine 属性监听器
window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        console.log('Wallpaper properties updated:', properties);
        
        // 监听主题切换
        if (properties.forcetheme) {
            currentTheme = properties.forcetheme.value;
            updateTheme();
        }
        
        // 监听自定义颜色
        if (properties.schemecolor) {
            const color = properties.schemecolor.value;
            updateColorScheme(color);
        }
    }
};

// 主题更新函数
function updateTheme() {
    console.log('Updating theme to:', currentTheme);
    const body = document.body;
    
    // 移除所有主题类
    body.classList.remove('theme-day', 'theme-night', 'theme-auto');
    
    let finalTheme = currentTheme;
    
    // 如果是自动模式，根据时间判断
    if (currentTheme === 'auto') {
        const hour = new Date().getHours();
        finalTheme = (hour >= 6 && hour < 18) ? 'day' : 'night';
        body.classList.add('theme-auto');
    }
    
    // 应用主题
    body.classList.add(`theme-${finalTheme}`);
    
    console.log('Applied theme:', finalTheme);
}

// 颜色方案更新函数
function updateColorScheme(colorString) {
    const rgb = colorString.split(' ');
    const r = parseInt(rgb[0]);
    const g = parseInt(rgb[1]);
    const b = parseInt(rgb[2]);
    
    const customColor = `rgb(${r}, ${g}, ${b})`;
    document.documentElement.style.setProperty('--custom-color', customColor);
    
    // 如果自定义颜色被设置，添加自定义颜色类
    if (r !== 255 || g !== 255 || b !== 255) {
        document.body.classList.add('custom-color');
    } else {
        document.body.classList.remove('custom-color');
    }
}

// 时间更新函数
function updateTime() {
    currentTime = new Date();
    
    const timeContainer = document.querySelector('.time-container');
    const dateContainer = document.querySelector('.date-container');
    
    if (timeContainer) {
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const seconds = currentTime.getSeconds().toString().padStart(2, '0');
        timeContainer.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    if (dateContainer) {
        const year = currentTime.getFullYear();
        const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
        const day = currentTime.getDate().toString().padStart(2, '0');
        const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const weekday = weekdays[currentTime.getDay()];
        dateContainer.textContent = `${year}-${month}-${day} ${weekday}`;
    }
    
    // 在自动模式下，每小时检查一次主题
    if (currentTheme === 'auto' && currentTime.getMinutes() === 0 && currentTime.getSeconds() === 0) {
        updateTheme();
    }
}

// 创建GitHub图标SVG
function createGitHubSVG() {
    return `
    <svg class="github-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path d="M512 0C229.12 0 0 229.12 0 512c0 226.56 146.56 418.56 350.08 485.76 25.6 4.48 35.2-10.88 35.2-24.32 0-12.16-0.64-52.48-0.64-95.36-128.64 23.68-161.92-31.36-172.16-60.16-5.76-14.72-30.72-60.16-52.48-72.32-17.92-9.6-43.52-33.28-0.64-33.92 40.32-0.64 69.12 37.12 78.72 52.48 46.08 77.44 119.68 55.68 149.12 42.24 4.48-33.28 17.92-55.68 32.64-68.48-113.92-12.8-233.216-56.96-233.216-252.8 0-55.68 19.84-101.76 52.48-137.6-5.12-12.8-23.04-65.28 5.12-135.68 0 0 42.88-13.44 140.8 52.48 40.96-11.52 84.48-17.28 128-17.28 43.52 0 87.04 5.76 128 17.28 97.92-66.56 140.8-52.48 140.8-52.48 28.16 70.4 10.24 122.88 5.12 135.68 32.64 35.84 52.48 81.28 52.48 137.6 0 196.48-119.68 240-233.6 252.8 18.56 16 34.56 46.72 34.56 94.72 0 68.48-0.64 123.52-0.64 140.8 0 13.44 9.6 29.44 35.2 24.32C877.44 930.56 1024 738.56 1024 512 1024 229.12 794.88 0 512 0z"/>
    </svg>`;
}

// 创建装饰性元素
function createDecorations() {
    return `
    <div class="decoration-dots">
        <div class="dot dot-1"></div>
        <div class="dot dot-2"></div>
        <div class="dot dot-3"></div>
        <div class="dot dot-4"></div>
        <div class="dot dot-5"></div>
    </div>
    `;
}

// 页面初始化
function initializePage() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="content">
            <div class="background-pattern"></div>
            ${createDecorations()}
            <div class="main-container">
                <div class="github-container">
                    ${createGitHubSVG()}
                    <div class="github-text">GitHub</div>
                </div>
                <div class="time-section">
                    <div class="time-container">00:00:00</div>
                    <div class="date-container">Loading...</div>
                </div>
            </div>
            <div class="footer-info">
                <div class="theme-indicator">主题: <span id="current-theme">自动</span></div>
            </div>
        </div>
    `;
    
    // 初始化主题和时间
    updateTheme();
    updateTime();
    updateThemeIndicator();
    
    // 设置定时器
    setInterval(updateTime, 1000);
    setInterval(updateThemeIndicator, 5000);
    
    console.log('GitHub Wallpaper - Redesigned Version initialized successfully');
}

// 更新主题指示器
function updateThemeIndicator() {
    const indicator = document.getElementById('current-theme');
    if (indicator) {
        let displayText = '';
        switch(currentTheme) {
            case 'auto':
                const hour = new Date().getHours();
                const autoTheme = (hour >= 6 && hour < 18) ? '白天' : '夜晚';
                displayText = `自动 (${autoTheme})`;
                break;
            case 'day':
                displayText = '白天';
                break;
            case 'night':
                displayText = '夜晚';
                break;
            default:
                displayText = '自动';
        }
        indicator.textContent = displayText;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initializePage);

// 兼容性：如果DOM已经加载完成
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}