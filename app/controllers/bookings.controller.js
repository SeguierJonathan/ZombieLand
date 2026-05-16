import {Booking, User, Tarif} from "../models/index.js";
import { notify } from "../utils/common.js";

export async function bookingPage(req, res) {
  const tarif = await Tarif.findOne();
  return res.render("booking", { tarif });
};

// Controllers pour USER

export async function createBooking(req, res) {
  const { date, nombre_de_personne } = req.body;
  const tarif = await Tarif.findOne();
  const nb = Number(nombre_de_personne);
  const prix_total = nb * tarif.price;

  const booking = await Booking.create({
    date,
    nombre_de_personne: nb,
    prix_total,
    userId: req.session.user.id
  });

  if (booking === 0) {
      notify.error(res, "Erreur lors de la création de votre réservation.");
      notify.redirect(res);
      return res.redirect('/reservation')
  }
    notify.success(res, "Création de votre réservation effectuée.");
    notify.redirect(res);
    return res.redirect('/mes-reservations');
};

export async function getMesReservations(req, res) {
  const reservations = await Booking.findAll({
    where: {
      userId: req.session.user.id
    },
    order: [["date", "ASC"]]
  });

  return res.render("mybookings", { reservations });
};

export async function updateBooking(req, res) {
  const bookingId = req.params.id;
  const tarif = await Tarif.findOne();
  const { date, nombre_de_personne } = req.body;
  const nb = Number(nombre_de_personne);
  const prix_total = nb * tarif.price;

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
        return res.redirect('/menu-administrateur/reservations');
    }
    notify.success(res, "Réservation supprimée");
    notify.redirect(res);
    return res.redirect('/menu-administrateur/reservations');
};

export async function AdminUpdateBooking(req, res) {
  const bookingId = req.params.id;
  const tarif = await Tarif.findOne();
  const { date, nombre_de_personne } = req.body;
  const nb = Number(nombre_de_personne);
  const prix_total = nb * tarif.price;

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
        return res.redirect('/menu-administrateur/reservations')
    }

    notify.success(res, "Mise à jour des informations effectuée.");
    notify.redirect(res);
    return res.redirect('/menu-administrateur/reservations');
};