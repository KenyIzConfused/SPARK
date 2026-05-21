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

// Authentication Functions
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            // Save user info to localStorage
            localStorage.setItem('userName', user.displayName || user.email.split('@')[0]);
            localStorage.setItem('userEmail', user.email);
            // Update welcome message
            document.querySelector('.tagline').textContent = 'Welcome ' + (user.displayName || user.email.split('@')[0]);
            alert('Signed in as ' + user.displayName);
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
            // Update welcome message
            document.querySelector('.tagline').textContent = 'Welcome ' + (user.displayName || user.email.split('@')[0]);
            alert('Signed in as ' + user.email);
        })
        .catch((error) => {
            alert('Email Sign-In Error: ' + error.message);
        });
}

function registerWithEmailForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const surName = document.getElementById('surName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Clear previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    successMessage.textContent = '';
    errorMessage.textContent = '';
    
    if (!firstName || !surName || !email || !password) {
        errorMessage.textContent = 'Please fill in all fields';
        errorMessage.style.display = 'block';
        return;
    }
    
    if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters long';
        errorMessage.style.display = 'block';
        return;
    }
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Save user info to localStorage
            localStorage.setItem('userName', firstName + ' ' + surName);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('surName', surName);
            // Update welcome message
            document.querySelector('.tagline').textContent = 'Welcome ' + firstName + ' ' + surName;
            successMessage.textContent = 'Account created successfully! Welcome ' + firstName + ' ' + surName;
            successMessage.style.display = 'block';
            // Clear form
            document.getElementById('firstName').value = '';
            document.getElementById('surName').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            // Redirect to main page after delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        })
        .catch((error) => {
            errorMessage.textContent = 'Registration Error: ' + error.message;
            errorMessage.style.display = 'block';
        });
}

function registerWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.createUserWithEmailAndPassword(provider)
        .then((result) => {
            const user = result.user;
            // Save user info to localStorage
            localStorage.setItem('userName', user.displayName || user.email.split('@')[0]);
            localStorage.setItem('userEmail', user.email);
            // Update welcome message
            document.querySelector('.tagline').textContent = 'Welcome ' + (user.displayName || user.email.split('@')[0]);
            alert('Google account created! Welcome ' + user.displayName);
        })
        .catch((error) => {
            alert('Google Registration Error: ' + error.message);
        });
}

// Navigation Handler
function handleNav(page) {
    if (page === 'Google') {
        signInWithGoogle();
    } else if (page === 'Email') {
        signInWithEmail();
    } else if (page === 'Register') {
        window.location.href = 'register.html';
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