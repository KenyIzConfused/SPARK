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

function registerWithEmail() {
    const email = prompt('Enter your email for registration:');
    const password = prompt('Enter a password (min 6 characters):');
    
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Save user info to localStorage
            localStorage.setItem('userName', user.email.split('@')[0]);
            localStorage.setItem('userEmail', user.email);
            // Update welcome message
            document.querySelector('.tagline').textContent = 'Welcome ' + user.email.split('@')[0];
            alert('Account created successfully! Welcome ' + user.email.split('@')[0]);
        })
        .catch((error) => {
            alert('Registration Error: ' + error.message);
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