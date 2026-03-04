import Booking from "../models/booking.model.js";
import { notify } from "../utils/common.js";

export async function bookingPage(req, res) {
  res.render("booking");
};

// Controllers pour USER

export async function createBooking(req, res) {
  const { date, nombre_de_personne } = req.body;
  const nb = Number(nombre_de_personne);
  const prix_total = nb * 30;

  const booking = await Booking.create({
    date,
    nombre_de_personne: nb,
    prix_total,
    userId: req.session.user.id
  });

  //!\\ ici booking n'est pas controler meme si create n'a pas reussi.

  res.redirect("/mes-reservations");
};

export async function getMesReservations(req, res) {
  const reservations = await Booking.findAll({
    where: {
      userId: req.session.user.id
    },
    order: [["date", "ASC"]]
  });

  res.render("mybookings", { reservations });
};

export async function updateBooking(req, res) {
  const bookingId = req.params.id;
  const { date, nombre_de_personne } = req.body;
  const nb = Number(nombre_de_personne);
  const prix_total = nb * 30;

  const [affectedCount] = await Booking.update(
    { date, nombre_de_personne: nb, prix_total },
    {
      where: {
        id: bookingId,
        userId: req.session.user.id
      },
      returning: true
    }
  );
    if (affectedCount === 0) {
        notify.error(res, "Erreur lors de la mise à jour des informations.");
        notify.redirect(res);
        return res.redirect('/mes-reservations')
    }
    notify.success(res, "Mise à jour des informations effectuée.");
    notify.redirect(res);
    return res.redirect('/mes-reservations');
};

export async function deleteBooking(req, res) {
  const bookingId = req.params.id;
  const deleteCount = await Booking.destroy({
    where: {
      id: bookingId,
      userId: req.session.user.id
    }
  });
  if (deleteCount === 0) {
    notify.error(res, "Erreur lors de la suppression de la réservation.");
    notify.redirect(res);
    return res.redirect('/mes-reservations')
  }
  notify.success(res, "Votre réservation a bien été supprimée.");
  notify.redirect(res);
  return res.redirect('/mes-reservations')

};


// Controllers pour l'ADMIN

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