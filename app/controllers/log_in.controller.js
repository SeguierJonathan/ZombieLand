import { User } from "../models/index.js";
import argon2 from 'argon2';

export async function logInPage(req, res) {
    return res.render('log_in')
};

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
            res.redirect('/mon-compte');
        });
    }
    else {
        res.send("Mauvais Email ou Mot de passe")
    }
}