import { Tarif } from "../models/index.js"
import { notify } from "../utils/common.js";

// ADMIN CONTROLLER // 

export async function getPricesAdmin(req, res) {
    const tarifId = req.params.id;
    const tarifs = await Tarif.findAll()
    res.render('admin-tarif', { tarifs, tarifId })
}

export async function updatePricesAdmin(req, res) {
    const [affectedCount] = await Tarif.update(
        req.body,
        {
            where: { id: req.params.id },
        });

    if (affectedCount === 0) {
        notify.error(res, "Erreur lors de la mise à jour des informations.");
        notify.redirect(res);
        return res.redirect('/menu-administrateur/tarifs')
    }
    notify.success(res, "Mise à jour des informations effectuée.");
    notify.redirect(res);
    return res.redirect('/menu-administrateur/tarifs');
}