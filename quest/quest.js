// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDvd-8wx5RHHl0hx6uaxgubg34z8un1o24",
    authDomain: "spark-e6450.firebaseapp.com",
    projectId: "spark-e6450",
    storageBucket: "spark-e6450.firebasestorage.app",
    messagingSenderId: "942740497464",
    appId: "1:942740497464:web:22f381f369335304e072cd"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Update UI based on auth state
auth.onAuthStateChanged((user) => {
    const tagline = document.getElementById('user-tagline');
    if (user) {
        // User is signed in
        const displayName = user.displayName || user.email.split('@')[0];
        tagline.textContent = `Welcome ${displayName}`;
    } else {
        // User is signed out
        tagline.textContent = 'QUEST MODE';
    }
});

// Quest practice function
function startPracticeSession() {
    window.location.href = 'practicesesh1.html';
}

// AI Chat Functions (similar to dashboard)
function toggleAI() {
    document.getElementById('ai-sidebar').classList.toggle('active');
    updateMascotBlink();
}

function updateMascotBlink() {
    const mascot = document.querySelector('.main-mascot-wrapper');
    const sidebar = document.getElementById('ai-sidebar');
    if (sidebar.classList.contains('active')) {
        mascot.classList.add('blink');
    } else {
        mascot.classList.remove('blink');
    }
}

function openSettings() {
    document.getElementById('settings-popup-overlay').classList.add('active');
}

function closeSettings() {
    document.getElementById('settings-popup-overlay').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('send-btn').addEventListener('click', handleChat);
    document.getElementById('user-input').addEventListener('keypress', (e) => {
        if(e.key === 'Enter') handleChat();
    });
    document.getElementById('settings-close-btn').addEventListener('click', closeSettings);
    document.getElementById('settings-popup-overlay').addEventListener('click', function(e) {
        if (e.target.id === 'settings-popup-overlay') {
            closeSettings();
        }
    });
    document.getElementById('settings-save-btn').addEventListener('click', function() {
        const name = document.getElementById('user-name').value;
        const theme = document.getElementById('theme-select').value;
        const notifications = document.getElementById('notifications-toggle').checked;
        alert('Settings saved!\nName: ' + name + '\nTheme: ' + theme + '\nNotifications: ' + (notifications ? 'On' : 'Off'));
        closeSettings();
    });
});

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

// Signs dictionary
const signs = {
    "hello": { v: "👋", d: "Move your hand from your forehead outward like a salute." },
    "thank you": { v: "🙏", d: "Touch your chin and move your hand forward toward the person." },
    "please": { v: "🔄", d: "Rub your flat hand in a circle over your chest." },
    "help": { v: "🙋", d: "Place a 'thumbs up' hand on your flat palm and lift together." }
};

function addMsg(text, type) {
    const chat = document.getElementById('chat-window');
    const b = document.createElement('div');
    b.className = 'bubble ' + type + '-bubble';
    b.innerHTML = text;
    chat.appendChild(b);
    chat.scrollTop = chat.scrollHeight;
}