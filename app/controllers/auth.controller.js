import argon2 from "argon2";
import { User } from "../models/index.js";

export function logout(req, res) {
    req.session.destroy((error) => {
        if (error) {
            console.log(error);
        }
        res.redirect("/")
    })
}

export async function login(req, res) {
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