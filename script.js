// XSS Practice Lab - Global JavaScript

// Update copyright year dynamically
document.addEventListener('DOMContentLoaded', function() {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }

    // Initialize lab grid on index page
    if (document.getElementById('labGrid')) {
        initializeLabGrid();
    }

    // Initialize individual labs
    initializeLabs();
});

// Lab data for dashboard
const labs = [
    { number: 1, title: 'Basic Reflected XSS', difficulty: 'beginner', description: 'Simple input reflection without sanitization' },
    { number: 2, title: 'DOM-Based XSS', difficulty: 'beginner', description: 'XSS through DOM manipulation' },
    { number: 3, title: 'Stored XSS (localStorage)', difficulty: 'intermediate', description: 'Persistent XSS using localStorage' },
    { number: 4, title: 'URL Parameter XSS', difficulty: 'intermediate', description: 'XSS through URL parameters' },
    { number: 5, title: 'Image onerror Injection', difficulty: 'intermediate', description: 'XSS using image error events' },
    { number: 6, title: 'Event Handler Injection', difficulty: 'intermediate', description: 'Various event handler injections' },
    { number: 7, title: 'Script Injection', difficulty: 'intermediate', description: 'Direct script tag injection' },
    { number: 8, title: 'Filter Bypass - Basic', difficulty: 'advanced', description: 'Bypass basic XSS filters' },
    { number: 9, title: 'Encoded Payload', difficulty: 'advanced', description: 'XSS with encoded characters' },
    { number: 10, title: 'JSON Injection', difficulty: 'advanced', description: 'XSS in JSON contexts' },
    { number: 11, title: 'Template Literal Injection', difficulty: 'advanced', description: 'XSS in template literals' },
    { number: 12, title: 'Advanced Filter Bypass', difficulty: 'advanced', description: 'Complex filter evasion techniques' },
    { number: 13, title: 'Multi-Context Injection', difficulty: 'pro', description: 'XSS in multiple contexts' },
    { number: 14, title: 'CSP Bypass Challenge', difficulty: 'pro', description: 'Bypass Content Security Policy' },
    { number: 15, title: 'Pro-Level Challenge', difficulty: 'pro', description: 'Ultimate XSS challenge' }
];

// Initialize the main dashboard lab grid
function initializeLabGrid() {
    const labGrid = document.getElementById('labGrid');
    
    labs.forEach(lab => {
        const labCard = createLabCard(lab);
        labGrid.appendChild(labCard);
    });
}

// Create individual lab card
function createLabCard(lab) {
    const card = document.createElement('a');
    card.href = `labs/lab${lab.number}.html`;
    card.className = 'lab-card';
    
    card.innerHTML = `
        <div class="lab-number">LAB #${lab.number.toString().padStart(2, '0')}</div>
        <div class="lab-title">${lab.title}</div>
        <div class="lab-description">${lab.description}</div>
        <div class="lab-difficulty difficulty-${lab.difficulty}">${lab.difficulty}</div>
    `;
    
    return card;
}

// Initialize individual lab pages
function initializeLabs() {
    // Common lab functionality
    setupBackToDashboard();
    setupResetButtons();
}

// Add back to dashboard link
function setupBackToDashboard() {
    const header = document.querySelector('.lab-header');
    if (header && !document.querySelector('.back-link')) {
        const backLink = document.createElement('a');
        backLink.href = '../index.html';
        backLink.className = 'back-link';
        backLink.innerHTML = '← Back to Dashboard';
        backLink.style.cssText = `
            color: #00ff00;
            text-decoration: none;
            display: inline-block;
            margin-bottom: 20px;
            border: 1px solid #00ff00;
            padding: 8px 16px;
            transition: all 0.3s ease;
        `;
        backLink.addEventListener('mouseover', () => {
            backLink.style.backgroundColor = '#00ff00';
            backLink.style.color = '#000';
        });
        backLink.addEventListener('mouseout', () => {
            backLink.style.backgroundColor = 'transparent';
            backLink.style.color = '#00ff00';
        });
        header.insertBefore(backLink, header.firstChild);
    }
}

// Setup reset buttons for labs
function setupResetButtons() {
    const resetButtons = document.querySelectorAll('.reset-button');
    resetButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            resetLab(this.dataset.lab);
        });
    });
}

// Reset lab to initial state
function resetLab(labId) {
    switch(labId) {
        case 'lab1':
            document.getElementById('output').innerHTML = '';
            document.getElementById('userInput').value = '';
            break;
        case 'lab2':
            document.getElementById('domOutput').innerHTML = '';
            document.getElementById('nameInput').value = '';
            break;
        case 'lab3':
            localStorage.removeItem('storedData');
            document.getElementById('storedOutput').innerHTML = 'No stored data';
            document.getElementById('storageInput').value = '';
            break;
        case 'lab4':
            // Clear URL parameters
            window.location.href = window.location.pathname;
            break;
        case 'lab5':
            document.getElementById('imageContainer').innerHTML = '<img src="valid-image.jpg" alt="Valid Image">';
            break;
        case 'lab6':
            document.getElementById('eventOutput').innerHTML = '';
            document.getElementById('eventInput').value = '';
            break;
        case 'lab7':
            document.getElementById('scriptOutput').innerHTML = '';
            document.getElementById('scriptInput').value = '';
            break;
        case 'lab8':
            document.getElementById('filterOutput').innerHTML = '';
            document.getElementById('filterInput').value = '';
            break;
        case 'lab9':
            document.getElementById('encodedOutput').innerHTML = '';
            document.getElementById('encodedInput').value = '';
            break;
        case 'lab10':
            document.getElementById('jsonOutput').innerHTML = '';
            document.getElementById('jsonInput').value = '';
            break;
        case 'lab11':
            document.getElementById('templateOutput').innerHTML = '';
            document.getElementById('templateInput').value = '';
            break;
        case 'lab12':
            document.getElementById('advancedOutput').innerHTML = '';
            document.getElementById('advancedInput').value = '';
            break;
        case 'lab13':
            document.getElementById('multiOutput').innerHTML = '';
            document.getElementById('multiInput').value = '';
            document.getElementById('multiSelect').value = 'html';
            break;
        case 'lab14':
            document.getElementById('cspOutput').innerHTML = '';
            document.getElementById('cspInput').value = '';
            break;
        case 'lab15':
            document.getElementById('proOutput').innerHTML = '';
            document.getElementById('proInput').value = '';
            document.getElementById('proHint').classList.add('hidden');
            break;
    }
}

// Sanitization functions for educational purposes
function sanitizeBasic(input) {
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function sanitizeAdvanced(input) {
    return input.replace(/[<>"']/g, function(match) {
        const map = {
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return map[match];
    });
}

// Alert interceptor for educational purposes
const originalAlert = window.alert;
window.alert = function(message) {
    console.log('XSS Attempt Detected! Payload:', message);
    const output = document.querySelector('.output-area:not(.no-intercept)');
    if (output) {
        output.innerHTML += `<div class="xss-detected">⚠️ XSS Payload Detected: ${message}</div>`;
    }
    originalAlert.call(window, 'XSS Attempt: ' + message);
};

// Add XSS detection styling
const style = document.createElement('style');
style.textContent = `
    .xss-detected {
        background-color: rgba(255, 0, 0, 0.2);
        border: 1px solid #ff0000;
        color: #ff0000;
        padding: 5px 10px;
        margin: 5px 0;
        font-size: 0.9rem;
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    .back-link:hover {
        background-color: #00ff00 !important;
        color: #000 !important;
    }
`;
document.head.appendChild(style);

// Helper function to escape HTML
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Helper function to get URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return params;
}

// Console warning for educational purposes
console.log('%c🔒 XSS Practice Lab - For Educational Purposes Only 🔒', 'color: #00ff00; font-size: 16px; font-weight: bold;');
console.log('%c⚠️ This environment is designed for learning about XSS vulnerabilities safely.', 'color: #ffff00; font-size: 14px;');