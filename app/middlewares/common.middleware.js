import "dotenv/config";
import { User, Role } from "../models/index.js";

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

export function isAllowed(requiredRole) {
    return async (req, res, next) => {
        //verifie que req.session.user existe
        if (!req.session.user) {
            console.warm("isAuth middleware missing before isAllowed");
            res.redirect("/connexion");
        }

        //recupere le role de l'utilisateur suivant sont id
        const userId = req.session.user.id;
        const user = await User.findByPk(userId, {
            attributes: [],
            include: {
                model: Role,
                as: "role",
                attributes: ["name"]
            }
        });

        //si role = admin alors suivant (admin a tous les droit)
        if (user.role.name === "admin") {
            return next();
        }

        // si non on compare le role user au role requis
        // si differant alors redirection vers la page 403 si non next()
        if (user.role.name !== requiredRole) {
            return res.redirect("/403");
        }

        next();


    }
}