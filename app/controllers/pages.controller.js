import {Activity}from "../models/index.js";

export async function homePage(req, res) {
        const activities = await Activity.findAll({
        order: [['createdAt', 'DESC']],
        limit: 3
    });
    res.render("home", { activities })
}

export function noFoundPage(req, res) {
    res.status(404).render("404");
}

export function errorPage(req, res) {
    res.status(500).render("500");
}
