document.addEventListener('DOMContentLoaded', function() {
    const bell = document.getElementById('bell');
    const countElement = document.getElementById('count');
    const bellSound = document.getElementById('bellSound');
    
    // Create a fallback sound in case the mp3 is not available
    let audioContext;
    try {
        // Feature detection for Web Audio API
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
    } catch (e) {
        console.log('Web Audio API is not supported in this browser');
    }
    
    // Function to play bell sound
    function playBellSound() {
        // Try to play the audio element first
        if (bellSound.readyState >= 2) { // HAVE_CURRENT_DATA or higher
            bellSound.currentTime = 0;
            bellSound.play().catch(error => {
                console.log('Error playing audio:', error);
                createFallbackSound();
            });
        } else {
            // Fallback to generated sound
            createFallbackSound();
        }
    }
    
    // Function to create a fallback bell sound using Web Audio API
    function createFallbackSound() {
        if (!audioContext) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.value = 830; // Higher pitched bell sound
        gainNode.gain.value = 0.5;
        
        // Bell-like envelope
        const now = audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.5, now + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
        
        oscillator.start();
        oscillator.stop(now + 1.5);
    }
    
    // Function to get count from storage
    function getCount() {
        // Try localStorage first (more reliable)
        const localCount = localStorage.getItem('bellCount');
        if (localCount !== null) {
            return parseInt(localCount, 10);
        }
        
        // Fallback to cookies
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith('bellCount=')) {
                return parseInt(cookie.substring('bellCount='.length), 10);
            }
        }
        
        return 0; // Default if neither exists
    }
    
    // Function to save count to both localStorage and cookies
    function saveCount(count) {
        // Save to localStorage (primary)
        localStorage.setItem('bellCount', count.toString());
        
        // Save to cookies (backup)
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        
        // Set secure cookie with all necessary attributes
        document.cookie = `bellCount=${count};expires=${expiryDate.toUTCString()};path=/;SameSite=Strict`;
        
        // Log for debugging
        console.log(`Count saved: ${count}`);
    }
    
    // Initialize count
    let count = getCount();
    countElement.textContent = count;
    console.log(`Initial count: ${count}`);
    
    // Bell click event
    bell.addEventListener('click', function() {
        // Increment and update count
        count++;
        countElement.textContent = count;
        
        // Save the updated count
        saveCount(count);
        
        // Play sound
        playBellSound();
        
        // Add animation class
        bell.classList.add('ring');
        
        // Remove animation class after animation completes
        setTimeout(function() {
            bell.classList.remove('ring');
        }, 800); // 800ms matches the animation duration
    });
});