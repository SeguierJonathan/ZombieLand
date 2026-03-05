const modal = {
    open: (id) => {
        const dialog = document.getElementById(id);
        if (dialog) dialog.showModal();
    },
    close: (id) => {
        const dialog = document.getElementById(id);
        if (dialog) dialog.close();
    },
    init: () => {
        const modals = document.querySelectorAll("dialog");

        modals.forEach(modal => {
            modal.addEventListener("click", (e) => {
                if (e.target === modal && modal.open) {
                    modal.close()
                }
            });

        });
    }
}

modal.init();