import Joi from "joi";
import { notify } from "../utils/common.js";

export function validateActivitiesUpdate(req, res, next) {
    const schemaActivities = Joi.object({

        name: Joi.string().trim().min(2),
        image: Joi.string().trim().min(2),
        minHeightCM: Joi.number().integer().min(3),
        horrorLevel: Joi.number().integer().min(1),
        durationSeconds: Joi.number().integer().min(2),
        description: Joi.string().trim().min(2),
        categoryId: Joi.number().integer().min(1)
    });

    const validation = schemaActivities.validate(req.body);

    if (validation.error) {
        notify.error(res, "Les informations de l'activité sont incorrects");
        notify.redirect(res);
        return res.redirect("/menu-administrateur/activites/" + req.params.id);
    }
    next();

}

export function validateActivitiesCreate(req, res, next) {
    const schemaActivities = Joi.object({

        name: Joi.string().trim().min(2).required(),
        image: Joi.string().trim().min(2).required(),
        minHeightCM: Joi.number().integer().min(3).required(),
        horrorLevel: Joi.number().integer().min(1).required(),
        durationSeconds: Joi.number().integer().min(2).required(),
        description: Joi.string().min(2).required(),
        categoryId: Joi.number().integer().min(1).required()
    });

    const validation = schemaActivities.validate(req.body);

    if (validation.error) {
        notify.error(res, "Les informations de l'activité sont incorrects");
        notify.redirect(res);
        return res.redirect("/menu-administrateur/activites/" + req.params.id);
    }

    next();

}

