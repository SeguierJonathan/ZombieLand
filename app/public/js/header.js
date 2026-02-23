const menuNavbar = document.getElementById("menu-navbar");
const mediaQuery = window.matchMedia("(min-width: 1280px)");

function initBurgerMenu() {
    const menuButton = document.getElementById("menu-button");

    menuButton.addEventListener("click", () => {
        menuNavbar.classList.toggle("expanded");
    });
}

function handleScreenChange(e) {
    if (e.matches) {
        console.log("expande true");
        menuNavbar.classList.remove("expanded");
    }
};

mediaQuery.addEventListener("change", handleScreenChange);

// exécution au chargement
initBurgerMenu();
handleScreenChange(mediaQuery);

