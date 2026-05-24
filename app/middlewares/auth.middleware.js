import Joi from "joi";
import { notify, PASSWORD_REGEX } from "../utils/common.js";

export function validateAuthRegister(req, res, next) {

    const schemaUser = Joi.object({
        lastName: Joi.string().trim().min(2).required()
            .messages({
                "string.min": "Le nom doit contenir au moins 2 caractères",
                "string.empty": "Le nom ne doit pas être vide"
            }),
        firstName: Joi.string().trim().min(2).required()
            .messages({
                "string.min": "Le prénom doit contenir au moins 2 caractères",
                "string.empty": "Le prénom ne doit pas être vide"
            }),
        email: Joi.string().trim().email().required()
            .messages({
                "string.email": "Veuillez saisir une adresse email valide",
                "string.empty": "Veuillez renseigner votre email"
            }),
        password: Joi.string().trim().min(8).pattern(PASSWORD_REGEX).required()
            .messages({
                "string.min": "Le mot de passe doit contenir au moins 8 caractères",
                "string.empty": "Le mot de passe ne doit pas être vide",
                "string.pattern.base": "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial (! @ # $ % & * _ + - =)"
            }),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required()
            .messages(
                {
                    "any.required": "La confirmation du mot de passe ne doit pas être vide",
                    "any.only": "Les mots de passe ne correspondent pas"
                }
            )
    })

    const validation = schemaUser.validate(req.body);

    if (validation.error) {
        notify.error(res, validation.error.details[0].message);
        // utiliser pour garder les notification apres un redirect

        return res.status(400).render("inscription", { info: req.body });
    }

    req.body = validation.value;

    next();

}

export function validateAuthLogin(req, res, next) {

    const schemaUser = Joi.object({
        email: Joi.string().trim().email().required()
            .messages({
                "string.email": "Veuillez saisir une adresse email valide",
                "string.empty": "Veuillez renseigner votre email"
            }),
        password: Joi.string()
            .trim().min(8)
            .pattern(PASSWORD_REGEX)
            .required()
            .messages({
                "string.min": "Le mot de passe doit contenir au moins 8 caractères",
                "string.empty": "Le mot de passe ne doit pas être vide",
                "string.pattern.base": "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial (! @ # $ % & * _ + - =)"
            }),
    })

    const validation = schemaUser.validate(req.body);

    if (validation.error) {
        notify.error(res, validation.error.details[0].message);
        // utiliser pour garder les notification apres un redirect
        notify.redirect(res);
        return res.redirect("/connexion");
    }

    req.body = validation.value;

    next();
}






