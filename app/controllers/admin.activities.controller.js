import { Activity, Category } from "../models/index.js";
import { notify } from "../utils/common.js";


export async function getAllAdmin(req, res) {
    const activities = await Activity.findAll();
    const categories = await Category.findAll({ attributes: ["id", "name"] });
    return res.render('admin-activities', { activities, categories });
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
    notify.success(res, "Suppression de l'activité réussie");
    notify.redirect(res);
    res.redirect("/menu-administrateur/activites");
}

export async function renderActivityDetailAdmin(req, res) {

    const activityId = req.params.id;

    const activity = await Activity.findByPk(activityId, {
        include: [{ model: Category, as: 'category', attributes: ["name"] }]
})
    if (!activity) {
        return res.send("L'activité n'existe pas")
    }
    res.render("admin-activity", { activity })
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
        return res.redirect('/menu-administrateur/activites/' + req.params.id)
    }

    notify.success(res, "Mise à jour des informations effectuée.");
    // utiliser pour garder les notification apres un redirect
    notify.redirect(res);
    res.redirect('/menu-administrateur/activites/' + req.params.id);
};