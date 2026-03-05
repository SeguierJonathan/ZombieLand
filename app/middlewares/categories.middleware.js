import Joi from "joi";
import { notify } from "../utils/common.js";

export function validateCategoriesUpdate(req, res, next) {

    const schemaCategories = Joi.object({
        name: Joi.string().trim().min(2),
        description: Joi.string().trim().min(2),
    })

    const validation = schemaCategories.validate(req.body);

    if (validation.error) {
        notify.error(res, "le nom ou la description est incorect");
        notify.redirect(res);
        return res.redirect("/menu-administrateur/categories");
    }
    next();

}

export function validateCategoriesCreation(req, res, next) {

    const schemaCategories = Joi.object({
        name: Joi.string().trim().min(2).required(),
        description: Joi.string().trim().min(2).required(),
    })

    const validation = schemaCategories.validate(req.body);

    if (validation.error) {
        notify.error(res, "le nom ou la description est incorect");
        notify.redirect(res);
        return res.redirect("/menu-administrateur/categories");
    }
    next();

}