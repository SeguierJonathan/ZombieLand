import { Activity, Category } from "../models/index.js";
import { notify } from "../utils/common.js";
import { formatSecondes, formatTaille } from "../utils/common.js";

// USER CONTROLLER //

export async function getAll(req, res) {
    const activities = await Activity.findAll();
    const categories = await Category.findAll({ attributes: ["id", "name"] });
    return res.render('activities', { activities, categories })
}

export async function getAllByCategory(req, res) {
    const categoryId = req.params.id;
    const categories = await Category.findAll({ attributes: ["id", "name"] });
    const activities = await Activity.findAll({
        where: { categoryId: categoryId }
    })
    return res.render('activities', { activities, categories, categoryId })
}

export async function renderActivityDetail(req, res) {

    const activityId = parseInt(req.params.id);
    if (isNaN(activityId)) {
        return res.send("L'ID n'existe pas ou ce n'est pas un chiffre")
    }
    const activity = await Activity.findByPk(activityId, {
        include: [{ model: Category, as: 'category', attributes: ["name"] }]
    })
    if (!activity) {
        return res.send("L'activité n'existe pas")
    }
    activity.durationSeconds = formatSecondes(activity.durationSeconds)
    activity.minHeightCM = formatTaille(activity.minHeightCM)
    res.render("activity", { activity })
}

// ADMIN CONTROLLER //

export async function getAllAdmin(req, res) {
    const activities = await Activity.findAll();
    const categories = await Category.findAll({ attributes: ["id", "name"] });
    return res.render('admin-activities', { activities, categories });
}

export async function getAllActivitiesByCategory(req, res) {

    const categoryId = req.params.id;
    const categories = await Category.findAll({ attributes: ["id", "name"] });
    const activities = await Activity.findAll({
        where: { categoryId: categoryId }
    });
    return res.render('admin-activities', { activities, categories, categoryId });
}

export async function renderActivityDetailAdmin(req, res) {

    const activityId = req.params.id;

    const categories = await Category.findAll({ attributes: ["id", "name"] });
    const activity = await Activity.findByPk(activityId, {
        include: [{ model: Category, as: 'category', attributes: ["id", "name"] }]
    });
    if (!activity) {
        return res.status(404).render('404');
    }

    res.render("admin-activity", { activity, categories });
}

export async function newActivityPage(req, res) {
    const categories = await Category.findAll();
    res.render("admin-activity-new", { categories });
}

export async function newActivityAdmin(req, res) {
    const { name } = req.body;

    const activity = await Activity.findOne({
        where: { name: name }
    })

    if (activity) {
        notify.error(res, "Nom de l'activité déjà existant");
        notify.redirect(res);
        res.redirect('/menu-administrateur/activites/nouvelle');
    }

    const createdActivity = Activity.create(req.body);

    if (!createdActivity) {
        notify.error(res, "Une erreur est survenue lors de l'ajout de l'activité");
        notify.redirect(res);
        res.redirect('/menu-administrateur/activites');
    }

    notify.success(res, "Activité ajoutée");
    notify.redirect(res);
    res.redirect('/menu-administrateur/activites');
}

export async function updateActivities(req, res) {
    const [affectedCount] = await Activity.update(
        req.body,
        {
            where: { id: req.params.id },
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