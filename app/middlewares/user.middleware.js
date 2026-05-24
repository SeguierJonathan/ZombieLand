import Joi from "joi";
import { notify, PASSWORD_REGEX } from "../utils/common.js";

export function validateUpdateAccount(req, res, next) {

    const schemaUser = Joi.object({
        firstName: Joi.string().trim().min(2).required()
            .messages({
                "string.min": "Le prénom doit contenir au moins 2 caractères",
                "string.empty": "Le prénom ne doit pas être vide"
            }),
        lastName: Joi.string().trim().min(2).required()
            .messages({
                "string.min": "Le nom doit contenir au moins 2 caractères",
                "string.empty": "Le nom ne doit pas être vide"
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
        newPassword: Joi.string().trim().min(8).empty("").pattern(PASSWORD_REGEX)
            .messages({
                "string.min": "Le mot de passe doit contenir au moins 8 caractères",
                "string.empty": "Le mot de passe ne doit pas être vide",
                "string.pattern.base": "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial (! @ # $ % & * _ + - =)"
            }),
        confirmPassword: Joi.string().empty("").when("newPassword", { is: Joi.exist(), then: Joi.valid(Joi.ref("newPassword")).required(), otherwise: Joi.optional() })
            .messages(
                {
                    "any.required": "Le confirm mot de passe ne doit pas être vide",
                    "any.only": "Les mots de passe ne correspondent pas"
                }
            )
    })

    const validation = schemaUser.validate(req.body);

    if (validation.error) {

        console.log(validation.error);

        notify.error(res, validation.error.details[0].message);
        // utiliser pour garder les notification apres un redirect
        notify.redirect(res);
        return res.status(400).redirect("/mon-compte");
    }

    req.body = validation.value;

    next();

}