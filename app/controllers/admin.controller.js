import { Booking, User, Category, Tarif, Activity } from "../models/index.js";
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

export async function deleteCategoriesAdmin(req, res) {
    const categorieId = req.params.id;
    const deteleCount = await Category.destroy({
        where: {
            id: categorieId,
        }
    });

    if (deteleCount === 0) {
        notify.error(res, "Une erreur est survenue lors de la suppression de la categorie");
        notify.redirect(res);
        res.redirect('/menu-administrateur/categories');
    }

    notify.success(res, "Categorie supprimé");
    notify.redirect(res);
    res.redirect('/menu-administrateur/categories');
}

export async function updateCategoriesAdmin(req, res) {

    const categorieId = req.params.id;

    const [affectedCount] = await Category.update(req.body, {
        where: {
            id: categorieId,
        }
    });

    if (affectedCount === 0) {
        notify.error(res, "Une erreur est survenue lors de la modification de la categorie");
        notify.redirect(res);
        res.redirect('/menu-administrateur/categories');
    }

    notify.success(res, "Categorie modifier");
    notify.redirect(res);
    res.redirect('/menu-administrateur/categories');
}

export async function createCategoriesAdmin(req, res) {

    const { name } = req.body;

    const categorie = await Category.findOne({
        where: { name: name }
    })

    if (categorie) {
        notify.error(res, "nom de categories déjà existant");
        notify.redirect(res);
        res.redirect('/menu-administrateur/categories');
    }

    const createdCategorie = Category.create(req.body);

    console.log(createdCategorie);


    if (!createdCategorie) {
        notify.error(res, "Une erreur est survenue lors de l'ajout de la categorie");
        notify.redirect(res);
        res.redirect('/menu-administrateur/categories');
    }

    notify.success(res, "Categorie ajouter");
    notify.redirect(res);
    res.redirect('/menu-administrateur/categories');
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






