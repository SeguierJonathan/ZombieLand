import { User } from "../models/index.js";
import argon2 from "argon2";

export async function accountPage(req, res) {

    const user = await User.findByPk(req.session.user.id);
    //!\\ il faut filtrer ou envoyer que les données utiles 
    res.render("account", { user })
}

export async function connected(req, res) {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    if (!user) {
        return res.send('Mauvais Email ou Mot de passe')
    }
    if (argon2.verify(user.password, req.body.password)) {

        // regenere id-session pour eviter la faille de session fixation
        req.session.regenerate((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Erreur de session");
            }
            // Stocker l'utilisateur dans la nouvelle session
            req.session.user = { id: user.id, firstName: user.firstName };
            res.redirect('/');
        });
    }
    else {
        res.send("Mauvais Email ou Mot de passe")
    }
}

export async function createAccount(req, res) {
    req.body.password = await argon2.hash(req.body.password);
    //!\\ revoir pour integrer le role par default "user"
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

export async function updateAccount(req,res) {
    const user = await User.findByPk(req.session.user.id);

    if (!user) {
        return res.status(404).send("Utilisateur introuvable");
    }

    const { firstName, lastName, email } = req.body;

    if (firstName && firstName.trim() !== "") {
        user.firstName = firstName;
    }

    if (lastName && lastName.trim() !== "") {
        user.lastName = lastName;
    }

    if (email && email.trim() !== "") {
        user.email = email;
    }

    await user.save();
    req.session.firstName = user.firstName;
    res.redirect ('/mon-compte');
};

export async function inscriptionPage(req, res) {
    return res.render('inscription')
};

export async function logInPage(req, res) {
    return res.render('log_in')
};