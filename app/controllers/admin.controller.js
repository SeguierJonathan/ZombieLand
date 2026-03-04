import { Booking, User, Category, Activity } from "../models/index.js";
import { notify } from "../utils/common.js";

export async function getAllBookings(req, res) {
    const reservations = await Booking.findAll({
        include: [{
            model: User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"]
        }],
        order: [["createdAt", "DESC"]]
    });
    return res.render('adminBooking', { reservations });
}

export async function AdminDeleteBooking(req, res) {
    const bookingId = req.params.id;
    const result = await Booking.destroy({
        where: {
            id: bookingId,
        }
    });
    if (!result) {
        notify.error(res, "Une erreur est survenue lors de la suppression de la réservation");
        notify.redirect(res);
        res.redirect('/menu-administrateur/reservations');
    }
    notify.success(res, "Réservation supprimée");
    notify.redirect(res);
    res.redirect('/menu-administrateur/reservations');
};

export async function getAllCategories(req, res) {

    const categoryId = req.params.id;
    const categories = await Category.findAll({ attributes: ["id", "name"] });
    const activities = await Activity.findAll({
        where: { categoryId: categoryId }
    })
    return res.render('admin-activities', { activities, categories, categoryId })
}





export async function AdminUpdateBooking(req, res) {
    const { date, nombre_de_personne } = req.body;
    const nb = Number(nombre_de_personne);
    const prix_total = nb * 30;
    const [affectedCount] = await Booking.update(
        { date, nombre_de_personne: nb, prix_total },
        {
            where: { id: req.params.id },
            returning: true
        }
    );

    if (affectedCount === 0) {
        notify.error(res, "Erreur lors de la mise à jour des informations.");
        notify.redirect(res);
        return res.redirect('/menu-administrateur/reservations')
    }

    notify.success(res, "Mise à jour des informations effectuée.");
    notify.redirect(res);
    return res.redirect('/menu-administrateur/reservations');
};






