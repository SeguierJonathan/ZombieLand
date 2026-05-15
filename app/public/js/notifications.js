const notifications = document.querySelectorAll('.notification');

function initNotifications() {

    if (notifications.length) {
        notifications.forEach((notification, index) => {
            setTimeout(() => {
                notification.classList.toggle("show");
                notification.setAttribute("aria-hidden", "false");
                setTimeout(() => {
                    notification.classList.toggle("show");
                    notification.setAttribute("aria-hidden", "true");
                }, 8000);

            }, index * 300)
        });
    }
}

setTimeout(initNotifications, 500);
