function redirectToCategory(id) {
    console.log("Text",id);
    
    if (id) {
        window.location.href = '/activites/categories/' + id;
    }
    else {window.location.href = '/activites'}
}
