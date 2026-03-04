import Joi from "joi";

export function validatePrice(req, res, next) {

    const schemaPrice = Joi.object({
        price: Joi.number().integer().required()
    })

    const validation = schemaPrice.validate(req.body);

    if (validation.error) {
        console.log("llololol",validation);
        
        return res.redirect("/menu-administrateur/tarifs");
    }

    next();
}
