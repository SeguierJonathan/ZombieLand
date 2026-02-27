import { Role, User } from "../models/index.js";
import argon2 from "argon2";

export async function accountPage(req, res) {

    const user = await User.findByPk(req.session.user.id);
    //!\\ il faut filtrer ou envoyer que les données utiles 
    res.render("account", { user })
}

export async function createAccount(req, res) {

    const role = await Role.findOne({ attributes: ["id"], where: { name: "user" } });

    //hash password in body
    req.body.password = await argon2.hash(req.body.password);
    //insert in body roleId
    req.body.roleId = role.id;

    const user = await User.create(req.body);

    if (!user) {
        //!\\ revoir le cas d'erreur
        return res.send("creation de compte erreur")
    }

    // regenere id-session pour eviter la faille de session fixation
    req.session.regenerate((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Erreur de session");
        };

        // Stocker l'utilisateur dans la nouvelle session
        req.session.user = { id: user.id, firstName: user.firstName };
        res.redirect('/');
    });
};

export async function updateAccount(req, res) {
    const { firstName, lastName, email } = req.body;
    const [affectedCount, affectedRows] = await User.update(
        { firstName, lastName, email },
        {
            where: { id: req.session.user.id },
            returning: true
        }
    );
    if (affectedCount === 0) {
        res.redirect('/mon-compte')
    }
    req.session.user.firstName = affectedRows[0].firstName;
    res.redirect('/mon-compte');
};

export async function deleteAccount(req, res) {
    const result = await User.destroy({
        where: {
            id: req.session.user.id
        }
    });
    if (result === 0) {
        res.redirect("/mon-compte");
    }
    req.session.destroy(function (err) {
        res.redirect("/");
    })

};

export async function inscriptionPage(req, res) {
    return res.render('inscription')
};

export async function logInPage(req, res) {
    return res.render('log_in')
};