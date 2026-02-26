const mediaQuery = window.matchMedia("(min-width: 1280px)");
const menuSlide = document.getElementById("mobile-menu");

function toggleMenu() {
    menuSlide.classList.toggle("expanded");
}

function initMenuSlide() {
    const menuButton = document.getElementById("menu-button");
    const menuClose = document.getElementById("close-button");

    menuButton.addEventListener("click", () => { toggleMenu() });
    menuClose.addEventListener("click", () => { toggleMenu() });
    menuSlide.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            toggleMenu();
        };
    });

}


function handleScreenChange(e) {
    if (e.matches) {
        menuSlide.classList.remove("expanded");
    }
};

mediaQuery.addEventListener("change", handleScreenChange);

// exécution au chargement

initMenuSlide();
handleScreenChange(mediaQuery);


