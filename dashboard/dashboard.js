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
    const dashboardUserAvatar = document.getElementById('dashboard-user-avatar');
    const dashboardUserName = document.getElementById('dashboard-user-name');
    const dashboardUserLevel = document.getElementById('dashboard-user-level');
    
    if (user) {
        // User is signed in
        const displayName = user.displayName || (localStorage.getItem('firstName') + ' ' + localStorage.getItem('surName')) || user.email.split('@')[0];
        const firstName = localStorage.getItem('firstName') || displayName.split(' ')[0];
        const surName = localStorage.getItem('surName') || (displayName.split(' ')[1] || '');
        
        // Update tagline (welcome message in the main content)
        tagline.textContent = `Welcome ${displayName}`;
        
        // Update user details in dashboard
        dashboardUserName.textContent = `${firstName} ${surName}`.trim() || displayName;
        dashboardUserLevel.textContent = 'Level: Novice'; // Default level, can be made dynamic later
        
        // Update avatar (first letter of first name)
        const firstLetter = firstName ? firstName.charAt(0).toUpperCase() : 'A';
        dashboardUserAvatar.textContent = firstLetter;
        
    } else {
        // User is signed out
        tagline.textContent = 'USER';
        dashboardUserName.textContent = 'First Last';
        dashboardUserLevel.textContent = 'Level: Novice';
        dashboardUserAvatar.textContent = 'A';
    }
});

// Authentication Functions
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            // Save user info to localStorage
            localStorage.setItem('userName', user.displayName || user.email.split('@')[0]);
            // Note: Google auth doesn't give us first/last name separately in this simple flow
            // In a real app, you might want to parse the displayName or get additional profile info
        })
        .catch((error) => {
            alert('Google Sign-In Error: ' + error.message);
        });
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
            // Note: Email/password registration doesn't capture first/last name in this simple flow
            // The registration form does capture this and saves it separately
        })
        .catch((error) => {
            alert('Email Sign-In Error: ' + error.message);
        });
}

// Navigation Handler
function handleNav(page) {
    if (page === 'Google') {
        signInWithGoogle();
    } else if (page === 'Email') {
        signInWithEmail();
    } else if (page === 'Register') {
        window.location.href = '../register.html';
    } else if (page === 'Settings') {
        // Toggle settings popup
        const settingsPopup = document.getElementById('settings-popup-overlay');
        if (settingsPopup) {
            settingsPopup.style.display = settingsPopup.style.display === 'block' ? 'none' : 'block';
        }
    }
}

// AI Chat Functions (copied from original script.js)
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

// Signs dictionary (copied from original script.js)
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

// Quest function
function startQuest() {
    window.location.href = '../quest/quest.html';
}

// Authentication Functions
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            // Save user info to localStorage
            localStorage.setItem('userName', user.displayName || user.email.split('@')[0]);
            localStorage.setItem('userEmail', user.email);
            // Update welcome message (handled by onAuthStateChanged)
        })
        .catch((error) => {
            alert('Google Sign-In Error: ' + error.message);
        });
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
            // Update welcome message (handled by onAuthStateChanged)
        })
        .catch((error) => {
            alert('Email Sign-In Error: ' + error.message);
        });
}

// Navigation Handler
function handleNav(page) {
    if (page === 'Google') {
        signInWithGoogle();
    } else if (page === 'Email') {
        signInWithEmail();
    } else if (page === 'Register') {
        window.location.href = '../register.html';
    } else if (page === 'Settings') {
        // Toggle settings popup
        const settingsPopup = document.getElementById('settings-popup-overlay');
        if (settingsPopup) {
            settingsPopup.style.display = settingsPopup.style.display === 'block' ? 'none' : 'block';
        }
    }
}

// AI Chat Functions (copied from original script.js)
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

// Signs dictionary (copied from original script.js)
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