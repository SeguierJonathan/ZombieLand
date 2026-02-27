export function homePage(req, res) {
    res.render("home")
}

export function noFoundPage(req, res) {
    res.status(404).render("404");
}

export function errorPage(req, res) {
    res.status(500).render("500");
}