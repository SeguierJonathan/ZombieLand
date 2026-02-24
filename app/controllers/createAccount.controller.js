import { User } from "../models/index.js";
import argon2 from "argon2";

export async function inscriptionPage(req, res) {
    return res.render('inscription')
};

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
        }

        // Stocker l'utilisateur dans la nouvelle session
        req.session.user = { id: user.id, firstName: user.firstName };
        res.redirect('/');
    });

}
