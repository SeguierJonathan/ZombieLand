import express from 'express';
import "dotenv/config";
import path from 'node:path';
import session from "express-session"
import pageRouter from "./routes/pages.router.js"

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = import.meta.dirname;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); //Récupérer les données envoyer depuis un formulaire

app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 1000 //temps d'expiration en milliseconde
    }
}))

app.use(pageRouter);

app.listen(PORT, () => {
    console.log(`Serveur is running at http://localhost:${PORT}`)
});