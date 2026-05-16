import Category from "../models/category.model.js";
import { notify } from "../utils/common.js";

export async function createCategoriesAdmin(req, res) {

    const { name } = req.body;

    const categorie = await Category.findOne({
        where: { name: name }
    })

    if (categorie) {
        notify.error(res, "nom de categories déjà existant");
        notify.redirect(res);
        return res.redirect('/menu-administrateur/categories');
    }

    const createdCategorie = await Category.create(req.body);

    if (!createdCategorie) {
        notify.error(res, "Une erreur est survenue lors de l'ajout de la categorie");
        notify.redirect(res);
        return res.redirect('/menu-administrateur/categories');
    }

    notify.success(res, "Categorie ajouter");
    notify.redirect(res);
    return res.redirect('/menu-administrateur/categories');
}

export async function getAllCategoriesAdmin(req, res) {

    const categories = await Category.findAll();
    return res.render("admin-categories", { categories: categories || [] });

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
        return res.redirect('/menu-administrateur/categories');
    }

    notify.success(res, "Categorie modifier");
    notify.redirect(res);
    return res.redirect('/menu-administrateur/categories');
}

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
        return res.redirect('/menu-administrateur/categories');
    }

    notify.success(res, "Categorie supprimé");
    notify.redirect(res);
    return res.redirect('/menu-administrateur/categories');
}
