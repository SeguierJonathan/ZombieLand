import { Activity } from "../models/index.js";

export async function getAllAdmin(req, res) {
    const activities = await Activity.findAll();
    return res.render('admin-activities', { activities});
}
