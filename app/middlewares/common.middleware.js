import "dotenv/config";
import { User, Role } from "../models/index.js";
import Joi from "joi";

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


export function initLocals(req, res, next) {

    // expose le firstName dans les locals pour utilisation dans les ejs sans avoir a les passer en paramètre
    res.locals.firstName = null;
    if (req.session.user) {
        res.locals.firstName = req.session.user.firstName;
    }

    // expose le firstName dans les locals pour utilisation dans les ejs sans avoir a les passer en paramètre
    res.locals.role = null;
    if (req.session.user) {
        res.locals.role = req.session.user.role;
    }

    // init locals.notifications
    res.locals.notifications = [];

    // recupère les notifications aprés une redirection au travers d'un cookie. 
    if (req.cookies.notifications) {

        const notifications = JSON.parse(req.cookies.notifications);
        console.log(notifications);
        res.locals.notifications = notifications;

        // suprimme le cookie
        res.clearCookie("notifications", {
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/"
        });
    }

    next();
}

export function validateId(req, res, next) {

    const schemaId = Joi.object({
        id: Joi.number().integer().min(1).required(),
    })
console.log("lololol",schemaId);

    const validation = schemaId.validate(req.body);
console.log("text test",validation);

    if (validation.error) {
        return res.redirect("/");
    }

    next();
}