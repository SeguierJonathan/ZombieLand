import { Booking, User } from "../models/index.js";
import { notify } from "../utils/common.js";

export async function getAllBookings(req,res) {
    const reservations = await Booking.findAll({
        include: [{
            model: User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"]
        }],
        order: [["createdAt", "DESC"]]
    });
    return res.render('adminBooking', {reservations});
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