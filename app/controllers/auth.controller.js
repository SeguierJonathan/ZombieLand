import argon2 from "argon2";
import { Role, User } from "../models/index.js";
import { notify } from "../utils/common.js";

export function logout(req, res) {
    req.session.destroy((error) => {
        if (error) {
            console.log(error);
        }
        notify.success(res, "déconnexion.");
        // utiliser pour garder les notification apres un redirect
        notify.redirect(res);
        return res.redirect("/")
    })
}

export async function login(req, res) {
    const user = await User.findOne({
        where: {
            email: req.body.email
        },
        include: {
            model: Role,
            as: 'role',
            attributes: ["name"]
        }
    })
    if (!user) {
        notify.error(res, 'Mauvais Email ou Mot de passe');
        // utiliser pour garder les notification apres un redirect
        notify.redirect(res);
        return res.redirect("/connexion");
    }

    if (await argon2.verify(user.password, req.body.password)) {

        // regenere id-session pour eviter la faille de session fixation
        req.session.regenerate((err) => {
            if (err) {
                console.log("session regenerate: ", err);
                return res.redirect("/connexion");
            }
            notify.success(res, 'Connexion reussi.');
            // utiliser pour garder les notification apres un redirect
            notify.redirect(res);
            // Stocker l'utilisateur dans la nouvelle session
            req.session.user = { id: user.id, firstName: user.firstName, role: user.role.name };
            return res.redirect('/');
        });
    }
    else {
        notify.error(res, 'Mauvais Email ou Mot de passe');
        // utiliser pour garder les notification apres un redirect
        notify.redirect(res);
        return res.redirect("/connexion");
    }
}