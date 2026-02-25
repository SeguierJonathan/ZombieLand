import Joi from "joi";

export function validateAuthRegister(req, res, next) {

    const shemaUser = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
        password: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/).required(),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required()
    })

    const validation = shemaUser.validate(req.body);

    if (validation.error) {
        //!\\ revoir le retour en cas de mauvais données
        return res.status(400).send(validation.error.details[0].message);
    }
    next();

}

export function validateAuthLogin(req, res, next) {

    console.log(req.body);

    const shemaUser = Joi.object({
        email: Joi.string().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
        password: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/).required(),

    })

    const validation = shemaUser.validate(req.body);

    if (validation.error) {
        //!\\ revoir le retour en cas de mauvais données
        return res.status(400).send(validation.error.details[0].message);
    }
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



