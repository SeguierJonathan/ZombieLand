import  Activity  from "../models/Activity.model.js";

export async function getAll(req,res) {
    const activities = await Activity.findAll();
    return res.render('activity', {activities})
}

export function homePage(req, res) {
    res.render("home")
};
