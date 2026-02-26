import Joi from "joi";

// Même schema pour créer ou modifier une réservation
export function validateBooking(req, res, next) {

    const bookingSchema = Joi.object({
        date: Joi.date().min(new Date().setHours(0, 0, 0, 0)).required(),
        nombre_de_personne: Joi.number().integer().min(1).required()
    })

    const validation = bookingSchema.validate(req.body);

    if (validation.error) {
        //!\\ revoir le retour en cas de mauvais données
        return res.status(400).send(validation.error.details[0].message);
    }
    next();

}
