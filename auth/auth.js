// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1Fl-_RQRlS0HEAEvK3nSxPCrO13vEiho",
    authDomain: "spark-24439.firebaseapp.com",
    projectId: "spark-24439",
    storageBucket: "spark-24439.firebasestorage.app",
    messagingSenderId: "288518751536",
    appId: "1:288518751536:web:c746f0e54af03f621474f5",
    measurementId: "G-LJN0B9Y3KE"
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

    // Make functions globally accessible
    window.signInWithGoogle = signInWithGoogle;
    window.signInWithEmail = signInWithEmail;
    window.signInWithEmailFromModal = signInWithEmailFromModal;


// Registration Functions
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
                window.location.href = '/index.html';
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

// Make registration functions globally accessible
window.registerWithEmailForm = registerWithEmailForm;
window.registerWithGoogle = registerWithGoogle;