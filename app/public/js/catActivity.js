function submitForm() {
    const select = document.querySelector('select[name="id"]');
    if (select.value) {

        window.location.href = '/activites/categories/' + select.value;
    }
    console.log("test");
    
}
