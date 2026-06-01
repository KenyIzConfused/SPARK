// DOM Elements
const sidebar = document.getElementById('ai-sidebar');
const mascot = document.getElementById('sparky-mascot');
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const signInBtn = document.querySelector('.button-primary');
const aboutBtn = document.querySelector('.about-btn');
const settingsBtn = document.querySelector('.settings-btn');

// ASL Signs Dictionary
const signs = {
    "hello": { v: "👋", d: "Move your hand from your forehead outward like a salute." },
    "thank you": { v: "🙏", d: "Touch your chin and move your hand forward toward the person." },
    "please": { v: "🔄", d: "Rub your flat hand in a circle over your chest." },
    "mother": { v: "👩", d: "Tap your thumb on your chin with an open hand." },
    "father": { v: "👨", d: "Tap your thumb on your forehead with an open hand." },
    "help": { v: "🙋", d: "Place a 'thumbs up' hand on your flat palm and lift together." },
    "sorry": { v: "✊", d: "Rub a fist in a circle over your chest." },
    "yes": { v: "✊", d: "Nod your fist up and down like a head." },
    "no": { v: "🤌", d: "Snap index and middle finger down to your thumb." }
};

// Toggle AI Sidebar
function toggleAI() {
    sidebar.classList.toggle('active');
}

// Animate Sparky talking
function sparkyTalk(duration) {
    mascot.classList.add('talking');
    setTimeout(() => {
        mascot.classList.remove('talking');
    }, duration);
}

// Add message to chat window
function addMsg(html, type) {
    const b = document.createElement('div');
    b.className = `bubble ${type}-bubble`;
    b.innerHTML = html;
    chatWindow.appendChild(b);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    if (type === 'ai') {
        sparkyTalk(1500);
    }
}

// Handle user chat input
function handleChat() {
    const input = document.getElementById('user-input');
    const val = input.value.toLowerCase().trim();
    if (!val) return;
    addMsg(input.value, 'user');
    input.value = "";
    setTimeout(() => {
        let found = false;
        for (let key in signs) {
            if (val.includes(key)) {
                addMsg('<b>' + key.toUpperCase() + ' ' + signs[key].v + '</b><br>' + signs[key].d, 'ai');
                found = true; break;
            }
        }
        if (!found) addMsg("I'm still learning that one! Try 'Hello' or 'Help'.", "ai");
    }, 500);
}

// Navigation button handlers
function handleSignIn() {
    window.open('signin/signin.html', '_blank');
}

function handleAbout() {
    window.open('about/about.html', '_blank');
}

function handleSettings() {
    window.open('settings/settings.html', '_blank');
}

// Event Listeners
sendBtn.addEventListener('click', handleChat);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
});

signInBtn.addEventListener('click', handleSignIn);
aboutBtn.addEventListener('click', handleAbout);
settingsBtn.addEventListener('click', handleSettings);
