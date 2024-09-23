const timerElement = document.getElementById('timer');
const beepSound = document.getElementById('beep-sound');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');

let timerInterval; // Variable to store the interval
let beepPlayed = false; // Flag to ensure beep is played only once at 10 seconds

startBtn.addEventListener('click', () => {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    // Check for negative values and correct them
    if (hours < 0 || minutes < 0 || seconds < 0) {
        alert('Please enter valid non-negative time values.');
        return;
    }

    // Convert total time to seconds
    let countdown = (hours * 3600) + (minutes * 60) + seconds;

    // If no time is entered, return early
    if (countdown <= 0) {
        alert('Please enter a valid time greater than 0.');
        return;
    }

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
            beepPlayed = true; // Ensure beep plays only once at 10 seconds
        }

        // Play beep when the countdown reaches 0
        if (countdown === 0) {
            beepSound.play(); // Play final beep at 0 seconds
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
    timerElement.innerText = '00:00:00'; // Reset the timer display to 00:00:00
    hoursInput.value = ''; // Clear the hours input field
    minutesInput.value = ''; // Clear the minutes input field
    secondsInput.value = ''; // Clear the seconds input field
    beepPlayed = false; // Reset beep flag
    beepSound.pause();  // Stop the beep sound
    beepSound.currentTime = 0; // Reset beep sound to start
});

// Format the time to HH:MM:SS format
function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
