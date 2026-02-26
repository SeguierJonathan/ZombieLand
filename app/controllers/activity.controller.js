import { Activity } from "../models/index.js";

//export async function getOne(req,res) {
//const activity = await Activity.findByPk();
//return res.render('activity', { activity })
//}

export async function renderActivityDetail(req, res) {
    console.log(req.params.id);
    
    const activityId = parseInt(req.params.id);
    if (isNaN(activityId)) {
        return res.send("L'ID n'existe pas ou ce n'est pas un chiffre")
    }
    const activity = await Activity.findByPk(activityId)
    if (!activity) {
        return res.send("L'activité n'existe pas")
    }
    res.render("activity", { activity })
}