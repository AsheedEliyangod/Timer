const timerElement = document.getElementById('timer');
const beepSound = document.getElementById('beep-sound');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const timeInput = document.getElementById('timeInput');

let timerInterval;
let beepPlayed = false;

startBtn.addEventListener('click', () => {
    let countdown = parseInt(timeInput.value) || 60; // Default to 60 seconds if input is invalid

    // Clear any previous interval to avoid multiple timers running
    clearInterval(timerInterval);
    beepPlayed = false;

    // Adjust the font size based on the screen width (for responsiveness)
    adjustFontSize();

    // Start the countdown
    timerInterval = setInterval(() => {
        timerElement.innerText = formatTime(countdown);

        // Play the beep sound when 10 seconds remain
        if (countdown === 10 && !beepPlayed) {
            beepSound.play();
            beepPlayed = true;
        }

        // Stop the timer when it reaches 0
        if (countdown === 0) {
            clearInterval(timerInterval);
        }

        // Decrement the countdown value
        if (countdown > 0) {
            countdown--;
        }
    }, 1000);
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerElement.innerText = '00:00'; // Reset the timer display
    timeInput.value = ''; // Clear the input field
    beepPlayed = false;
});

// Format seconds to MM:SS format
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Adjust font size for responsiveness
function adjustFontSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 600) {
        timerElement.style.fontSize = '36px';
        startBtn.style.padding = '8px 16px';
        startBtn.style.fontSize = '14px';
        resetBtn.style.padding = '8px 16px';
        resetBtn.style.fontSize = '14px';
        timeInput.style.fontSize = '14px';
        timeInput.style.width = '60px';
        timeInput.style.padding = '8px';
    } else {
        timerElement.style.fontSize = '48px';
        startBtn.style.padding = '10px 20px';
        startBtn.style.fontSize = '16px';
        resetBtn.style.padding = '10px 20px';
        resetBtn.style.fontSize = '16px';
        timeInput.style.fontSize = '16px';
        timeInput.style.width = '80px';
        timeInput.style.padding = '10px';
    }
}

// Run font size adjustment on window resize
window.addEventListener('resize', adjustFontSize);
