// countdown.js

let notificationEnabled = false;

// Function to handle notification sending
function notifyUser(message) {
    if (Notification.permission === "granted") {
        new Notification("Griffin", {
            body: message,
            icon: "path/to/icon.png" // Optional: Path to an icon image
        });
    }
}

// Function to calculate the time remaining until midnight
function updateCountdown() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set to midnight of the next day

    const timeRemaining = midnight - now;

    if (timeRemaining <= 0) {
        countdownElement.innerText = "Happy New Year from Griffin! 🎉";
        if (notificationEnabled) {
            notifyUser("🎉 Happy New Year from Griffin!");  // Show a notification at midnight
        }
        clearInterval(countdownInterval);
        return;
    }

    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    countdownElement.innerText = `Time until midnight: ${hours}h ${minutes}m ${seconds}s`;

    // Notify 5 minutes before midnight
    if (timeRemaining <= 5 * 60 * 1000 && notificationEnabled) {
        notifyUser("⏰ 5 minutes before midnight! Brace for impact!");  // Send notification
        notificationEnabled = false; // Prevent repeated notifications
    }
}

// Function to enable notifications (called by a user action)
function enableNotification() {
    if (Notification.permission === "granted") {
        notificationEnabled = true;
        alert("Notifications enabled! You'll be notified 5 minutes before midnight.");
    } else {
        alert("Please enable notifications first!");
    }
}

// Start the countdown
const countdownElement = document.getElementById('countdown');
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call to avoid delay

// Request permission for notifications when the page loads
if ("Notification" in window) {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            console.log("Notifications enabled!");
            notificationEnabled = true;  // Enable notifications if permission is granted
        } else {
            console.log("Notifications denied!");
        }
    });
}
