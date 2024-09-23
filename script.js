const timerElement = document.getElementById('timer');
const beepSound = document.getElementById('beep-sound');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const timeInput = document.getElementById('timeInput');

let timerInterval; // Variable to store the interval
let beepPlayed = false; // Flag to ensure beep is played only once at 10 seconds

startBtn.addEventListener('click', () => {
    let countdown = parseInt(timeInput.value) || 60; // Get user input or default to 60 seconds

    // Clear any existing interval if the button is pressed again
    clearInterval(timerInterval);
    beepPlayed = false; // Reset the beep flag when the timer starts

    // Start the countdown timer
    timerInterval = setInterval(() => {
        // Update the timer text
        timerElement.innerText = formatTime(countdown);

        // Play beep sound once at 10 seconds remaining
        if (countdown === 10 && !beepPlayed) {
            beepSound.play();
            beepPlayed = true; // Ensure beep plays only once
        }

        // When the countdown reaches 0, stop the timer
        if (countdown === 0) {
            clearInterval(timerInterval); // Stop the timer
        }

        // Decrement the countdown value
        if (countdown > 0) {
            countdown--;
        }
    }, 1000);
});

// Add functionality for the reset button
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval); // Stop the timer
    timerElement.innerText = '00:00'; // Reset the timer display
    timeInput.value = ''; // Clear the input field
    beepPlayed = false; // Reset beep flag
});

// Format the time to MM:SS format
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
