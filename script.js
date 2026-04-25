const signs = {
    "hello": { v: "👋", d: "Move your hand from your forehead outward like a salute." },
    "thank you": { v: "🙏", d: "Touch your chin and move your hand forward toward the person." },
    "please": { v: "🔄", d: "Rub your flat hand in a circle over your chest." },
    "help": { v: "🙋", d: "Place a 'thumbs up' hand on your flat palm and lift together." }
};

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

function openGoogle() {
    document.getElementById('google-popup-overlay').classList.add('active');
}

function closeGoogle() {
    document.getElementById('google-popup-overlay').classList.remove('active');
}

function handleNav(page) {
    if (page === 'Settings') {
        openSettings();
    } else if (page === 'Google') {
        openGoogle();
    } else {
        alert("Opening " + page + "...");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Load saved name on page load
    const savedName = localStorage.getItem('userName') || 'USER';
    document.querySelector('.tagline').textContent = 'Welcome ' + savedName;

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
        const name = document.getElementById('user-name').value.trim() || 'USER';
        const theme = document.getElementById('theme-select').value;
        const notifications = document.getElementById('notifications-toggle').checked;

        // Save to localStorage
        localStorage.setItem('userName', name);

        // Update the welcome message
        document.querySelector('.tagline').textContent = 'Welcome ' + name;

        alert('Settings saved!\nName: ' + name + '\nTheme: ' + theme + '\nNotifications: ' + (notifications ? 'On' : 'Off'));
        closeSettings();
    });

    document.getElementById('google-close-btn').addEventListener('click', closeGoogle);
    document.getElementById('google-popup-overlay').addEventListener('click', function(e) {
        if (e.target.id === 'google-popup-overlay') {
            closeGoogle();
        }
    });
    document.querySelector('.google-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Signing in... (This is a demo)');
        closeGoogle();
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

function addMsg(text, type) {
    const chat = document.getElementById('chat-window');
    const b = document.createElement('div');
    b.className = 'bubble ' + type + '-bubble';
    b.innerHTML = text;
    chat.appendChild(b);
    chat.scrollTop = chat.scrollHeight;
}