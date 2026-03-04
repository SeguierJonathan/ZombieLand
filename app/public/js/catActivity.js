function redirectToCategory(id) {
    if (id) {
        window.location.href = '/activites/categories/' + id;
    }
    else { window.location.href = '/activites' }
}

function redirectToCategoryAdmin(id) {    
    if (id) {
        window.location.href = '/menu-administrateur/activites/categories' + id;
    }
    else {window.location.href = '/menu-administrateur/activites'}
}
