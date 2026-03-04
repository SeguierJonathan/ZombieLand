import { Booking, User, Category, Activity } from "../models/index.js";
import { notify } from "../utils/common.js";



export async function getAllCategories(req, res) {

    const categoryId = req.params.id;
    const categories = await Category.findAll({ attributes: ["id", "name"] });
    const activities = await Activity.findAll({
        where: { categoryId: categoryId }
    })
    return res.render('admin-activities', { activities, categories, categoryId })
}












