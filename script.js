// Navigation Handler
function handleNav(page) {
    if (page === 'Google') {
        // Show Google sign-in modal
        var modal = document.getElementById('google-modal');
        var instance = M.Modal.init(modal);
        instance.open();
    } else if (page === 'Email') {
        // Show Email sign-in modal
        var modal = document.getElementById('email-modal');
        var instance = M.Modal.init(modal);
        instance.open();
    } else if (page === 'Register') {
        window.location.href = '/register/register.html';
    } else if (page === 'Settings') {
        // Toggle settings popup
        const settingsPopup = document.getElementById('settings-popup-overlay');
        if (settingsPopup) {
            settingsPopup.style.display = settingsPopup.style.display === 'block' ? 'none' : 'block';
        }
    }
}

// AI Chat Functions
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
    
    // Initialize Materialize modals
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
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

function signInWithEmail() {
    const email = prompt('Enter your email:');
    const password = prompt('Enter your password:');
    
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Save user info to localStorage
            localStorage.setItem('userName', user.displayName || user.email.split('@')[0]);
            localStorage.setItem('userEmail', user.email);
            // Update welcome message
            document.querySelector('.tagline').textContent = 'Welcome ' + (user.displayName || user.email.split('@')[0]);
            alert('Signed in as ' + user.email);
        })
        .catch((error) => {
            alert('Email Sign-In Error: ' + error.message);
        });
}

// Sign in with email from modal
function signInWithEmailFromModal() {
    const email = document.getElementById('modal-email').value.trim();
    const password = document.getElementById('modal-password').value;
    
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Save user info to localStorage
            localStorage.setItem('userName', user.displayName || user.email.split('@')[0]);
            localStorage.setItem('userEmail', user.email);
            // Update welcome message
            document.querySelector('.tagline').textContent = 'Welcome ' + (user.displayName || user.email.split('@')[0]);
            alert('Signed in as ' + user.email);
            // Close modal
            var modalInstance = M.Modal.getInstance(document.getElementById('email-modal'));
            modalInstance.close();
            // Clear form
            document.getElementById('modal-email').value = '';
            document.getElementById('modal-password').value = '';
        })
        .catch((error) => {
            alert('Email Sign-In Error: ' + error.message);
        });
}

// AI Chat Functions
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
    
    // Initialize Materialize modals
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
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