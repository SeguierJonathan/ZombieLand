import { Activity, User } from "../models/index.js"

export async function getAll(req, res) {
    const activities = await Activity.findAll();
    return res.render('activity', { activities })
}

export function homePage(req, res) {
    res.render("home")
};

export async function accountPage(req, res) {

    const user = await User.findByPk(req.session.user.id);
    //!\\ il faut filtrer ou envoyer que les données utiles 
    res.render("account", { user })

};
