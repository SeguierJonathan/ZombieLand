const input = document.getElementById("nombre_de_personne");
const unitPrice = document.getElementById("prix_unitaire");
const totalPrice = document.getElementById("prix-total");


console.log(input);

input.addEventListener("input", (e) => {
    const nb_personne = parseInt(input.value);
    const price = parseInt(unitPrice.textContent);
    
    totalPrice.textContent = (nb_personne * price) + " €";  
});