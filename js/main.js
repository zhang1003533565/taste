// 垃圾分类数据库
const wasteDatabase = {
    "苹果核": "厨余垃圾",
    "塑料瓶": "可回收物",
    "废电池": "有害垃圾",
    "餐巾纸": "其他垃圾",
    // 可以继续添加更多物品
};

// 搜索功能
function searchItem() {
    const searchInput = document.getElementById('searchInput').value;
    const searchResult = document.getElementById('searchResult');
    
    if (wasteDatabase[searchInput]) {
        searchResult.innerHTML = `<p>"${searchInput}" 属于 ${wasteDatabase[searchInput]}</p>`;
    } else {
        searchResult.innerHTML = '<p>未找到该物品，请换个关键词试试</p>';
    }
}

// 积分系统
let points = localStorage.getItem('points') || 0;
let lastCheckIn = localStorage.getItem('lastCheckIn') || null;

function updatePointsDisplay() {
    document.getElementById('currentPoints').textContent = points;
}

function checkIn() {
    const today = new Date().toDateString();
    
    if (lastCheckIn !== today) {
        points = Number(points) + 10;
        localStorage.setItem('points', points);
        localStorage.setItem('lastCheckIn', today);
        updatePointsDisplay();
        alert('签到成功！获得10积分');
    } else {
        alert('今天已经签到过了，明天再来吧！');
    }
}

// 问答系统
const quizQuestions = [
    {
        question: "以下哪个属于可回收物？",
        options: ["废纸", "剩饭", "废电池", "烟蒂"],
        correct: 0
    },
    {
        question: "以下哪个属于有害垃圾？",
        options: ["塑料袋", "废电池", "果皮", "餐巾纸"],
        correct: 1
    },
    // 可以继续添加更多题目
];

let currentQuestionIndex = 0;

function displayQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');
    
    quizQuestion.innerHTML = `<h3>${question.question}</h3>`;
    quizOptions.innerHTML = question.options.map((option, index) => `
        <div class="quiz-option" onclick="checkAnswer(${index})">
            ${option}
        </div>
    `).join('');
}

function checkAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    if (selectedIndex === question.correct) {
        alert('回答正确！获得5积分');
        points = Number(points) + 5;
        localStorage.setItem('points', points);
        updatePointsDisplay();
    } else {
        alert('回答错误，请继续努力！');
    }
}

function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % quizQuestions.length;
    displayQuestion();
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    updatePointsDisplay();
    displayQuestion();
});

// 奖励系统
const rewards = [
    { name: "环保购物袋", points: 100 },
    { name: "可降解垃圾袋", points: 200 },
    { name: "精美徽章", points: 300 }
];

function displayRewards() {
    const rewardsList = document.querySelector('.rewards-list');
    rewardsList.innerHTML = rewards.map(reward => `
        <div class="reward-item">
            <h4>${reward.name}</h4>
            <p>所需积分：${reward.points}</p>
            <button onclick="exchangeReward('${reward.name}', ${reward.points})">
                兑换
            </button>
        </div>
    `).join('');
}

function exchangeReward(name, requiredPoints) {
    if (points >= requiredPoints) {
        points -= requiredPoints;
        localStorage.setItem('points', points);
        updatePointsDisplay();
        alert(`成功兑换 ${name}！`);
    } else {
        alert('积分不足，继续加油吧！');
    }
}

// 页面加载时显示奖励列表
document.addEventListener('DOMContentLoaded', () => {
    displayRewards();
}); 