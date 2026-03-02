import { Activity } from "../models/index.js";
import { notify } from "../utils/common.js";


export async function getAllAdmin(req, res) {
    const activities = await Activity.findAll();
    return res.render('admin-activities', { activities });
}

export async function deleteActivities(req, res) {
    const result = await Activity.destroy({
        where: {
            id: req.params.id
        }
    });
    if (result === 0) {
        notify.error(res, "Une erreur est survenue lors de la suppression de l'activité");
        notify.redirect(res);
        res.redirect("/menu-administrateur/activites");
    }
    notify.success(res,"Suppression de l'activité réussie");
    notify.redirect(res);
    res.redirect("/menu-administrateur/activites");
}

export async function updateActivities(req, res) {
    const { name, image, minHeightCM, horrorLevel, durationSeconds, description } = req.params;
    const [affectedCount] = await Activity.update(
        { name, image, minHeightCM, horrorLevel, durationSeconds, description },
        {
            where: { id: req.params.id },
            returning: true
        }
    );

    if (affectedCount === 0) {
        notify.error(res, "Erreur lors de la mise à jour des informations.");
        // utiliser pour garder les notification apres un redirect
        notify.redirect(res);
        res.redirect('/menu-administrateur/activites/:id')
    }

    notify.success(res, "Mise à jour des informations effectuée.");
    // utiliser pour garder les notification apres un redirect
    notify.redirect(res);
    res.redirect('/menu-administrateur/activites/:id');
};