import Booking from "../models/booking.model.js";

export async function bookingPage(req, res) {
  res.render("booking");
};

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

  await Booking.update(
    { date, nombre_de_personne: nb, prix_total },
    { where: { 
      id: bookingId,
      userId: req.session.user.id
     }, 
     returning: true 
    }
  );

  res.redirect("/mes-reservations");
};

export async function deleteBooking(req,res) {
  const bookingId = req.params.id;
  await Booking.destroy({
    where: {
      id: bookingId,
      userId: req.session.user.id
    }
  })
  res.redirect('/mes-reservations');
};