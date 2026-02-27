function redirectToCategory(id) {    
    if (id) {
        window.location.href = '/activites/categories/' + id;
    }
    else {window.location.href = '/activites'}
}
