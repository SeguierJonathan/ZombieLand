import { User } from "../models/index.js";
import argon2 from "argon2";

export async function inscriptionPage(req, res) {
    return res.render('inscription')
};

export async function createAccount(req, res) {
    req.body.password = await argon2.hash(req.body.password);
    const data = await User.create(req.body);
    res.send(data);
}
