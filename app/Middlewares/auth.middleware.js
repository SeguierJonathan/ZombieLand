import Joi from "joi";

export function validateAuthRegister(req, res, next) {

    const shemaUser = Joi.object({
        firtName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
        password: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/).required(),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required()
    })

    const validation = shemaUser.validate(req.body);

    if (validation.error) {
        res.status(400).send(validation.error);
    }

    next();

}

export function validateAuthLogin(req, res, next) {

    const shemaUser = Joi.object({
        email: Joi.string().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
        password: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/).required(),

    })

    const validation = shemaUser.validate(req.body);

    if (validation.error) {
        res.status(400).send(validation.error);
    }

    next();

}




