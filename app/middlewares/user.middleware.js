import Joi from "joi";
import { notify } from "../utils/common.js";

export function validateUpdateAccount(req, res, next) {

    const schemaUser = Joi.object({
        firstName: Joi.string().trim().min(2).required(),
        lastName: Joi.string().trim().min(2).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/).required(),
        newPassword: Joi.string().trim().min(8).empty("").pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/),
        confirmPassword: Joi.string().empty("").when("newPassword", { is: Joi.exist(), then: Joi.valid(Joi.ref("newPassword")).required(), otherwise: Joi.optional() })
    })

    const validation = schemaUser.validate(req.body);

    if (validation.error) {
        console.log(validation.error);

        notify.error(res, 'Email ou mot de passe incorrect');
        // utiliser pour garder les notification apres un redirect
        notify.redirect(res);
        return res.redirect("/connexion");
    }
    next();

}