const enableNotificationsBtn = document.getElementById('enableNotificationsBtn');
const notificationStatus = document.getElementById('notificationStatus');

// Check if the user has previously granted or denied notifications and update UI
if (localStorage.getItem('notificationStatus') === 'granted') {
    notificationStatus.innerText = "🔔";
    enableNotificationsBtn.disabled = true;
} else if (localStorage.getItem('notificationStatus') === 'denied') {
    notificationStatus.innerText = "🔕";
    enableNotificationsBtn.disabled = true;
}

// When the user clicks the enable notifications button
enableNotificationsBtn.addEventListener('click', () => {
    // Request notification permission
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            notificationStatus.innerText = "🔔";  // Show bell icon when notifications are enabled
            localStorage.setItem('notificationStatus', 'granted'); // Save permission status
            console.log("Notifications enabled!");
            enableNotificationsBtn.disabled = true; // Disable the button
        } else {
            notificationStatus.innerText = "🔕";  // Show muted bell when notifications are denied
            localStorage.setItem('notificationStatus', 'denied'); // Save permission status
            console.log("Notifications denied!");
            enableNotificationsBtn.disabled = true; // Disable the button
        }
    });
});
