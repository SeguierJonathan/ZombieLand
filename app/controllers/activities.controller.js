import { Activity } from "../models/index.js";

export async function getAll(req, res) {
    const activities = await Activity.findAll();
    return res.render('activities', { activities })
}