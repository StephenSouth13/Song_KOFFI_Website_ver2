// Language switching functionality for Sống KOFFI website

let currentLanguage = 'vi';
let translations = {};

// Initialize language system
document.addEventListener('DOMContentLoaded', function() {
    loadTranslations();
    initLanguageToggle();
    
    // Get saved language preference
    const savedLang = localStorage.getItem('songkoffi_language') || 'vi';
    if (savedLang !== currentLanguage) {
        switchLanguage(savedLang);
    }
});

// Load translation files
async function loadTranslations() {
    try {
        const [viResponse, enResponse] = await Promise.all([
            fetch('lang/vi.json'),
            fetch('lang/en.json')
        ]);
        
        translations.vi = await viResponse.json();
        translations.en = await enResponse.json();
        
        // Apply current language
        applyTranslations();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Initialize language toggle button
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLanguage === 'vi' ? 'en' : 'vi';
            switchLanguage(newLang);
        });
        
        // Update button text
        updateToggleButton();
    }
}

// Switch language
function switchLanguage(lang) {
    if (lang === currentLanguage) return;
    
    currentLanguage = lang;
    localStorage.setItem('songkoffi_language', lang);
    
    applyTranslations();
    updateToggleButton();
    
    // Update document language attribute
    document.documentElement.lang = lang;
}

// Apply translations to page elements
function applyTranslations() {
    if (!translations[currentLanguage]) return;
    
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        const translation = translations[currentLanguage][key];
        
        if (translation) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else if (element.tagName === 'INPUT' && element.placeholder !== undefined) {
                element.placeholder = translation;
            } else if (element.tagName === 'TITLE') {
                element.textContent = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Update dynamic content
    updateDynamicContent();
}

// Update language toggle button
function updateToggleButton() {
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.textContent = currentLanguage === 'vi' ? 'EN' : 'VN';
    }
}

// Update dynamic content that might be loaded via JavaScript
function updateDynamicContent() {
    // Update menu categories
    updateMenuCategories();
    
    // Update form labels and placeholders
    updateFormElements();
    
    // Update date formats
    updateDateFormats();
}

// Update menu category names
function updateMenuCategories() {
    const categoryElements = document.querySelectorAll('.menu-item-category');
    categoryElements.forEach(element => {
        const category = element.textContent.toLowerCase();
        const translation = getCategoryTranslation(category);
        if (translation) {
            element.textContent = translation;
        }
    });
}

// Get category translation
function getCategoryTranslation(category) {
    const categoryMap = {
        'espresso': {
            vi: 'Espresso',
            en: 'Espresso'
        },
        'cold-brew': {
            vi: 'Cold Brew',
            en: 'Cold Brew'
        },
        'signature': {
            vi: 'Signature',
            en: 'Signature'
        },
        'dessert': {
            vi: 'Tráng Miệng',
            en: 'Dessert'
        }
    };
    
    return categoryMap[category] ? categoryMap[category][currentLanguage] : null;
}

// Update form elements
function updateFormElements() {
    // Update select options
    const guestSelect = document.getElementById('guests');
    if (guestSelect) {
        const options = guestSelect.querySelectorAll('option');
        options.forEach(option => {
            const key = option.getAttribute('data-lang');
            const translation = translations[currentLanguage][key];
            if (translation) {
                option.textContent = translation;
            }
        });
    }
}

// Update date formats
function updateDateFormats() {
    // Implementation for updating date formats
    // This function should be defined based on specific requirements
    console.log('Date formats updated for language:', currentLanguage);
}