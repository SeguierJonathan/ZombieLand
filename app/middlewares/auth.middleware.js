import Joi from "joi";

export function validateAuthRegister(req, res, next) {

    const schemaUser = Joi.object({
        firstName: Joi.string().trim().min(2).required(),
        lastName: Joi.string().trim().min(2).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/).required(),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required()
    })

    const validation = schemaUser.validate(req.body);

    if (validation.error) {
        //!\\ revoir le retour en cas de mauvais données
        return res.status(400).send(validation.error.details[0].message);
    }
    next();

}

export function validateAuthLogin(req, res, next) {

    const schemaUser = Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string()
            .trim().min(8)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/)
            .required(),
    })

    const validation = schemaUser.validate(req.body);

    if (validation.error) {
        notify.error(res, 'Email ou mot de passe incorrect');
        // utiliser pour garder les notification apres un redirect
        notify.redirect(res);
        return res.redirect("/connexion");
    }
    next();
}

export function validateUpdateAccount(req, res, next) {

    const schemaUser = Joi.object({
        firstName: Joi.string().trim().min(2).required(),
        lastName: Joi.string().trim().min(2).required(),
        email: Joi.string().trim().email().required(),
    })

    const validation = schemaUser.validate(req.body);

    if (validation.error) {
        notify.error(res, 'Email ou mot de passe incorrect');
        // utiliser pour garder les notification apres un redirect
        notify.redirect(res);
        return res.redirect("/connexion");
    }
    next();

}




