const notifications = document.querySelectorAll('.notification');

function initNotifications() {

    if (notifications.length) {
        notifications.forEach((notification, index) => {
            setTimeout(() => {
                notification.classList.toggle("show");
                setTimeout(() => {
                    notification.classList.toggle("show");
                }, 3500);

            }, index * 300)
        });
    }
}

setTimeout(initNotifications, 500);
