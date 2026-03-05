import Joi from "joi";
import { notify } from "../utils/common.js";


// Même schema pour créer ou modifier une réservation
export function validateBooking(req, res, next) {

    const bookingSchema = Joi.object({
        date: Joi.date().min(new Date().setHours(0, 0, 0, 0)).required(),
        nombre_de_personne: Joi.number().integer().min(1).required()
    })

    const validation = bookingSchema.validate(req.body);

    if (validation.error) {
        notify.error(res, "Format de date incorrect");
        notify.redirect(res);
        return res.redirect("/mes-reservations");        
    }
    next();

}
