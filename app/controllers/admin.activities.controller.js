import {Activity} from "../models/index.js";

export async function getAllAdmin(req,res) {
const activitiesAdmin = await Activity.findAll();
res.render("admin.activities", {activitiesAdmin});
}