const toggleBtn = document.getElementById("togglePasswordBtn");
const form = document.getElementById("passwordForm");



function hideForm() {
    toggleBtn.addEventListener("click", () => {
        form.classList.toggle("hidden");

    if (form.classList.contains("hidden")) {
        toggleBtn.textContent = "Modifier mon mot de passe";
    } else {
        toggleBtn.textContent = "Annuler";
    }        
    });
}

hideForm();