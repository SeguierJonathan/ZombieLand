import  Activity  from "../models/Activity.model.js"

export async function getAll(req,res) {
    const activities = await Activity.findAll();
    return res.render('activity', {activities})
}

export function homePage(req, res) {
    res.render("home")
};

export async function accountPage(req, res) {
    // const user = await User.findByPk(userId); 
    const user = {
        firstName: "JoJo",
        lastName: "Barjo",
        email: "Jojo@outlook.fr"
    }
    res.render("account", {user})
};
