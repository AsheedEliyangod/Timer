const timerElement = document.getElementById('timer');
const beepSound = document.getElementById('beep-sound');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const timeInput = document.getElementById('timeInput');

let timerInterval;
let beepPlayed = false;

// Update timer display when user enters the time
timeInput.addEventListener('input', () => {
    const timeValue = parseInt(timeInput.value) || 0;
    timerElement.innerText = formatTime(timeValue);
});

// Start countdown on button click
startBtn.addEventListener('click', () => {
    let countdown = parseInt(timeInput.value) || 60; // Default to 60 seconds if no input

    // Clear any previous interval
    clearInterval(timerInterval);
    beepPlayed = false;

    // Adjust styles based on screen size
    adjustStylesForScreenSize();

    // Start the countdown
    timerInterval = setInterval(() => {
        timerElement.innerText = formatTime(countdown);

        // Play the beep sound at 10 seconds remaining
        if (countdown === 10 && !beepPlayed) {
            beepSound.play();
            beepPlayed = true;
        }

        // Stop the timer when countdown reaches 0
        if (countdown === 0) {
            clearInterval(timerInterval);
        }

        // Decrement the countdown value
        if (countdown > 0) {
            countdown--;
        }
    }, 1000);
});

// Reset timer and input on button click
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerElement.innerText = '00:00'; // Reset display
    timeInput.value = ''; // Clear input field
    beepPlayed = false;
});

// Format time in MM:SS format
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Adjust styles based on screen width for responsiveness
function adjustStylesForScreenSize() {
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

// Adjust styles whenever the window is resized
window.addEventListener('resize', adjustStylesForScreenSize);
