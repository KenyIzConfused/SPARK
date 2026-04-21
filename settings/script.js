(function() {
    const STORAGE_KEY = 'spark_settings';

    const defaultSettings = {
        darkMode: false,
        brightness: 100,
        volume: 80,
        notificationSounds: true,
        language: 'en',
        fontSize: 'medium',
        autoSave: true,
        compactMode: false
    };

    let settings = { ...defaultSettings };

    function loadSettings() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                settings = { ...defaultSettings, ...JSON.parse(saved) };
            } catch (e) {
                settings = { ...defaultSettings };
            }
        }
    }

    function saveSettings() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }

    function applySettings() {
        document.body.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
        document.body.setAttribute('data-font-size', settings.fontSize);
        document.documentElement.style.filter = `brightness(${settings.brightness}%)`;
        
        const brightnessValue = document.getElementById('brightness');
        const volumeValue = document.getElementById('volume');
        const darkModeToggle = document.getElementById('darkMode');
        const notificationSoundsToggle = document.getElementById('notificationSounds');
        const languageSelect = document.getElementById('language');
        const fontSizeSelect = document.getElementById('fontSize');
        const autoSaveToggle = document.getElementById('autoSave');
        const compactModeToggle = document.getElementById('compactMode');

        if (brightnessValue) brightnessValue.value = settings.brightness;
        if (volumeValue) volumeValue.value = settings.volume;
        if (darkModeToggle) darkModeToggle.checked = settings.darkMode;
        if (notificationSoundsToggle) notificationSoundsToggle.checked = settings.notificationSounds;
        if (languageSelect) languageSelect.value = settings.language;
        if (fontSizeSelect) fontSizeSelect.value = settings.fontSize;
        if (autoSaveToggle) autoSaveToggle.checked = settings.autoSave;
        if (compactModeToggle) compactModeToggle.checked = settings.compactMode;
    }

    function initEventListeners() {
        document.getElementById('darkMode')?.addEventListener('change', (e) => {
            settings.darkMode = e.target.checked;
            saveSettings();
            applySettings();
        });

        document.getElementById('brightness')?.addEventListener('input', (e) => {
            settings.brightness = parseInt(e.target.value);
            saveSettings();
            applySettings();
        });

        document.getElementById('volume')?.addEventListener('input', (e) => {
            settings.volume = parseInt(e.target.value);
            saveSettings();
        });

        document.getElementById('notificationSounds')?.addEventListener('change', (e) => {
            settings.notificationSounds = e.target.checked;
            saveSettings();
        });

        document.getElementById('language')?.addEventListener('change', (e) => {
            settings.language = e.target.value;
            saveSettings();
        });

        document.getElementById('fontSize')?.addEventListener('change', (e) => {
            settings.fontSize = e.target.value;
            saveSettings();
            applySettings();
        });

        document.getElementById('autoSave')?.addEventListener('change', (e) => {
            settings.autoSave = e.target.checked;
            saveSettings();
        });

        document.getElementById('compactMode')?.addEventListener('change', (e) => {
            settings.compactMode = e.target.checked;
            saveSettings();
            document.body.classList.toggle('compact', settings.compactMode);
        });
    }

    loadSettings();
    applySettings();
    initEventListeners();
})();
