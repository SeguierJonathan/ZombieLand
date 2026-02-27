import Joi from "joi";

export function validateAuthRegister(req, res, next) {

    const shemaUser = Joi.object({
        firstName: Joi.string().trim().min(2).required(),
        lastName: Joi.string().trim().min(2).required(),
        email: Joi.string().trim().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
        password: Joi.string().trim().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/).required(),
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

    const shemaUser = Joi.object({
        email: Joi.string().trim().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
        password: Joi.string().trim().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/).required(),

    })

    const validation = shemaUser.validate(req.body);

    if (validation.error) {
        //!\\ revoir le retour en cas de mauvais données
        return res.status(400).send(validation.error.details[0].message);
    }
    next();

}

export function validateUpdateAccount(req, res, next) {

    const shemaUser = Joi.object({
        firstName: Joi.string().trim().min(2).required(),
        lastName: Joi.string().trim().min(2).required(),
        email: Joi.string().trim().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
    })

    const validation = shemaUser.validate(req.body);

    if (validation.error) {
        //!\\ revoir le retour en cas de mauvais données
        return res.status(400).send(validation.error.details[0].message);
    }
    next();

}




