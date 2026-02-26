import { Activity, Category } from "../models/index.js";

export async function getAll(req, res) {
    const activities = await Activity.findAll();
    const categories = await Category.findAll({ attributes: ["name"] });
    return res.render('activities', { activities, categories })
}

export async function getAllByCategory(req, res) {
    const categoryId = req.params.id;
    const categories = await Category.findAll({ attributes: ["name"] });
    const activities = await Activity.findAll({
        where: { categoryId: categoryId }
    })
    return res.render('activities', { activities, categories })

}
