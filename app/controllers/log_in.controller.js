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
        res.redirect('/');
    }
    else {
        res.send("Mauvais Email ou Mot de passe")
    }
}