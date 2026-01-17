// 移动端导航栏切换
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// 夜间模式切换
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;
// 注意：现在图标是在 button 内部的 i 标签
const themeIcon = themeBtn.querySelector('i');

// 检查本地存储中是否有保存的主题偏好
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeBtn.addEventListener('click', (e) => {
    // 阻止链接跳转（因为按钮在 a 标签里面，或者紧挨着）
    e.preventDefault();
    e.stopPropagation();

    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark'); // 保存偏好
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light'); // 保存偏好
    }
});

// 点击链接后自动关闭菜单
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// 表情包系列切换 (Tabs)
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. 移除所有按钮的激活状态
        tabBtns.forEach(b => b.classList.remove('active'));
        // 2. 隐藏所有内容
        tabContents.forEach(c => c.classList.remove('active'));
        
        // 3. 激活当前点击的按钮
        btn.classList.add('active');
        // 4. 显示对应的内容
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// 简单的图片灯箱效果 (Lightbox)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');

// 使用事件委托，这样动态切换的内容也能被点击
document.addEventListener('click', (e) => {
    // 检查是否点击了 gallery-item 内部的任何元素 (图片、遮罩层、图标等)
    const galleryItem = e.target.closest('.gallery-item');
    
    if (galleryItem) {
        // 找到该 item 内部的图片
        const img = galleryItem.querySelector('img');
        if (img) {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
        }
    }
});

// 点击关闭按钮
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// 点击背景也可以关闭
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// 🖱️ 鼠标点击特效：爱心炸裂
document.addEventListener('click', (e) => {
    const heart = document.createElement('div');
    heart.classList.add('click-heart');
    
    // 随机选择一个爱心颜色
    const colors = ['❤️', '🧡', '💛', '💚', '💙', '💜', '💖'];
    heart.innerText = colors[Math.floor(Math.random() * colors.length)];
    
    // 设置爱心位置
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    
    document.body.appendChild(heart);
    
    // 动画结束后移除元素
    setTimeout(() => {
        heart.remove();
    }, 800);
});

// 🐱 动态头像轮播
let currentAvatarIndex = 0;
const avatars = document.querySelectorAll('.avatar');
const meowSound = document.getElementById('meow-sound');
const meowBtn = document.getElementById('meow-btn');
let isSoundOn = false;

// 每3秒切换一次头像
setInterval(() => {
    // 隐藏当前头像
    avatars[currentAvatarIndex].classList.remove('active');
    // 计算下一个头像索引
    currentAvatarIndex = (currentAvatarIndex + 1) % avatars.length;
    // 显示下一个头像
    avatars[currentAvatarIndex].classList.add('active');
    
    // 如果开启了音效，且切图时想喵一声（可选：这里设置为每次切图不一定叫，避免太吵，或者点击才叫）
    // 为了不打扰用户，我们设定为：只有点击头像时才叫，或者手动开启音效后切图叫
}, 3000);

// 🔊 音效开关逻辑
meowBtn.addEventListener('click', () => {
    isSoundOn = !isSoundOn;
    const icon = meowBtn.querySelector('i');
    if (isSoundOn) {
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
        meowSound.play(); // 试听一声
    } else {
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
    }
});

// 点击头像容器也能喵一声
document.querySelector('.avatar-container').addEventListener('click', () => {
    if (isSoundOn) {
        meowSound.currentTime = 0; // 重置播放进度
        meowSound.play().catch(e => console.log('播放失败', e));
        
        // 弹出简单的“喵~”文字特效
        const meowText = document.createElement('div');
        meowText.innerText = "喵~";
        meowText.style.position = 'absolute';
        meowText.style.color = 'var(--primary-color)';
        meowText.style.fontWeight = 'bold';
        meowText.style.fontSize = '2rem';
        meowText.style.left = '50%';
        meowText.style.top = '50%';
        meowText.style.transform = 'translate(-50%, -50%)';
        meowText.style.pointerEvents = 'none';
        meowText.style.animation = 'floatUp 1s ease-out forwards';
        document.querySelector('.about-img-wrapper').appendChild(meowText);
        
        setTimeout(() => meowText.remove(), 1000);
    } else {
        // 提示用户开启音效
        showModal('请先点击右下角的小喇叭开启音效哦~ 🔊');
    }
});

// 🏷️ 徽章点击说话
document.querySelectorAll('.badge').forEach(badge => {
    badge.addEventListener('click', () => {
        const msg = badge.getAttribute('data-msg');
        showModal(msg);
    });
});

// ✨ 自定义弹窗函数
function showModal(message) {
    const modal = document.getElementById('custom-modal');
    const modalText = document.getElementById('modal-text');
    const closeBtn = document.querySelector('.close-modal');
    const confirmBtn = document.querySelector('.modal-btn');
    
    modalText.innerText = message;
    modal.style.display = 'flex';
    
    // 关闭逻辑
    const closeModal = () => {
        modal.style.display = 'none';
    };
    
    closeBtn.onclick = closeModal;
    confirmBtn.onclick = closeModal;
    
    // 点击背景关闭
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };
}

// 📊 性格雷达图初始化
const ctx = document.getElementById('personalityChart').getContext('2d');

// 判断当前主题色
const isDarkMode = document.body.classList.contains('dark-mode');
const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(174, 204, 192, 0.3)'; // 用淡绿色网格
const pointLabelColor = isDarkMode ? '#e0e0e0' : '#888';

const personalityChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['粘人度', '调皮值', '干饭积极性', '嗜睡指数', '好奇宝宝'],
        datasets: [{
            label: '泡芙猫性格分析',
            data: [5, 4, 5, 4, 3], // 数据范围 0-5
            backgroundColor: 'rgba(244, 208, 208, 0.5)', // 颜色更通透
            borderColor: '#F4D0D0',
            borderWidth: 3,
            pointBackgroundColor: '#fff', // 白色圆点
            pointBorderColor: '#AECCC0', // 薄荷绿边框
            pointBorderWidth: 3,
            pointRadius: 6, // 点变大
            pointHoverRadius: 9,
            pointHoverBackgroundColor: '#AECCC0',
            pointHoverBorderColor: '#fff'
        }]
    },
    options: {
        scales: {
            r: {
                angleLines: { color: gridColor },
                grid: { 
                    color: gridColor,
                    circular: true, // ✨ 关键修改：把网格变成圆形的，更可爱！
                    lineWidth: 1.5 // 网格线稍微粗一点点
                },
                pointLabels: { 
                    color: pointLabelColor, 
                    font: { size: 16, family: "'ZCOOL KuaiLe', 'LXGW WenKai Screen', sans-serif" } 
                },
                suggestedMin: 0,
                suggestedMax: 5,
                ticks: { display: false, stepSize: 1 } // 隐藏刻度数字
            }
        },
        plugins: {
            legend: { display: false }
        },
        onClick: (e, activeElements) => {
            if (activeElements.length > 0) {
                const index = activeElements[0].index;
                const labels = ['粘人度', '调皮值', '干饭积极性', '嗜睡指数', '好奇宝宝'];
                const descriptions = [
                    '粘人度满分：走哪跟哪，睡觉必须贴贴 ❤️',
                    '调皮值爆表：每天不仅要跑酷，还要咬烂纸箱 📦',
                    '干饭王：听到开罐头的声音，3秒内必达现场 🐟',
                    '睡神转世：一天24小时，能睡20个小时 💤',
                    '好奇宝宝：什么都要闻一闻，什么都要摸一摸 😺'
                ];
                showModal(descriptions[index]);
            }
        }
    }
});

// 🖱️ 卡片 Hover 音效
const cards = document.querySelectorAll('.info-card[data-sound="true"]');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (isSoundOn) {
            // 播放一个短促可爱的音效，这里复用 meowSound，可以截取前0.5秒或者音量调小
            const cloneSound = meowSound.cloneNode();
            cloneSound.volume = 0.3; // 声音小一点
            cloneSound.play().catch(() => {});
        }
    });
});

// 添加浮动动画样式到页面
const style = document.createElement('style');
style.innerHTML = `
@keyframes floatUp {
    0% { opacity: 1; transform: translate(-50%, -50%); }
    100% { opacity: 0; transform: translate(-50%, -150%); }
}
`;
document.head.appendChild(style);

// 📸 自动为表情包添加“手写文字”效果
document.querySelectorAll('.gallery-item').forEach(item => {
    const img = item.querySelector('img');
    if (img) {
        // 创建一个显示文字的 span
        const caption = document.createElement('span');
        caption.innerText = img.alt || 'Meow~';
        caption.className = 'gallery-caption';
        // 样式已经通过 CSS 控制，这里直接插入
        item.appendChild(caption);
    }
});