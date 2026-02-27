import "dotenv/config";

export function errorHandler(error, req, res, next) {

    const nodeMode = process.env.NODE_ENV || "development";

    if (nodeMode === "development") {
        console.log(error);
    } else {
        //i\\ logs files
    }
    res.status(500).render("500");
    next();
}

export function isAuth(req, res, next) {
    // verifie si req.session.user existe si oui alors connecter
    if (!req.session.user) {
        return res.redirect('/connexion');
    }
    next();
}

export function preventIfLoggedIn(req, res, next) {
    //verifie si on est déjà connecter
    if (req.session.user) {
        // déjà connecter alors on redirect vers home
        return res.redirect('/');
    }
    next();

}