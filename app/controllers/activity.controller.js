import { Activity, Category } from "../models/index.js";
import { formatSecondes, formatTaille } from "../utils/common.js";

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