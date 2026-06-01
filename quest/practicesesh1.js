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
        tagline.textContent = 'SESSION 1';
    }
});

// Practice session variables
let videoElement = null;
let canvasElement = null;
let stream = null;

// Sign to practice
const currentSign = {
    name: "Hello",
    emoji: "👋",
    description: "Move your hand from your forehead outward like a salute."
};

// Initialize the practice session
document.addEventListener('DOMContentLoaded', function() {
    // Set up the instruction card
    document.querySelector('.sign-description').textContent = currentSign.description;
    document.querySelector('.sign-emoji').textContent = currentSign.emoji;
    
    // Get DOM elements
    videoElement = document.getElementById('videoElement');
    canvasElement = document.getElementById('canvasElement');
    const startCameraBtn = document.getElementById('startCameraBtn');
    const captureBtn = document.getElementById('captureBtn');
    const retakeBtn = document.getElementById('retakeBtn');
    const nextBtn = document.getElementById('nextBtn');
    const feedbackSection = document.getElementById('feedback-section');
    const feedbackText = document.getElementById('feedback-text');
    const resultEmoji = document.getElementById('result-emoji');
    
    // Event listeners
    startCameraBtn.addEventListener('click', startCamera);
    captureBtn.addEventListener('click', captureSign);
    retakeBtn.addEventListener('click', resetSession);
    nextBtn.addEventListener('click', () => {
        // In a real app, this would go to the next sign or finish the quest
        alert('Great job! Moving on to the next sign...');
        // For now, just reset to practice the same sign again
        resetSession();
    });
    
    // AI Chat Functions (similar to other pages)
    setupAIChat();
});

// Start camera access
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'user' } // Use front-facing camera
        });
        videoElement.srcObject = stream;
        
        // Hide start camera button, show capture button
        startCameraBtn.style.display = 'none';
        captureBtn.style.display = 'inline-block';
    } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Unable to access camera. Please make sure you have granted camera permissions.");
    }
}

// Capture and process the sign
function captureSign() {
    if (!videoElement || !stream) {
        alert("Camera not ready yet. Please wait a moment.");
        return;
    }
    
    // Hide capture button, show retake and next buttons
    document.getElementById('captureBtn').style.display = 'none';
    document.getElementById('retakeBtn').style.display = 'inline-block';
    document.getElementById('nextBtn').style.display = 'inline-block';
    
    // Draw video frame to canvas for processing
    const context = canvasElement.getContext('2d');
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    
    // In a real app, we would analyze the canvas here to detect the sign
    // For this prototype, we'll simulate a successful detection after a delay
    showFeedback(true);
}

// Show feedback based on sign detection
function showFeedback(isCorrect) {
    const feedbackSection = document.getElementById('feedback-section');
    const feedbackText = document.getElementById('feedback-text');
    const resultEmoji = document.getElementById('result-emoji');
    
    if (isCorrect) {
        feedbackText.textContent = "Great job! You performed the Hello sign correctly!";
        resultEmoji.textContent = "👏";
        resultEmoji.style.color = "#4CAF50"; // Green
    } else {
        feedbackText.textContent = "Almost there! Try again - remember to move your hand from your forehead outward.";
        resultEmoji.textContent = "🤔";
        resultEmoji.style.color = "#FF9800"; // Orange
    }
    
    feedbackSection.style.display = 'block';
}

// Reset session to try again
function resetSession() {
    // Show start camera button, hide capture, retake and next buttons
    document.getElementById('startCameraBtn').style.display = 'inline-block';
    document.getElementById('captureBtn').style.display = 'none';
    document.getElementById('retakeBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    
    // Hide feedback
    document.getElementById('feedback-section').style.display = 'none';
    
    // Stop the video stream
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
        videoElement.srcObject = null;
    }
    
    // Optionally, we could restart the video stream here
}

// AI Chat Functions
function setupAIChat() {
    // Toggle AI sidebar
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

function toggleAI() {
    document.getElementById('ai-sidebar').classList.toggle('active');
    updateMascotBlink();
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

// Clean up when leaving the page
window.addEventListener('beforeunload', function() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
});