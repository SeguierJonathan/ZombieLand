import express from 'express';
import path from 'node:path';
import session from './config/express-session.js';
import "dotenv/config";

import pageRouter from "./routes/pages.router.js"
import { log } from 'node:console';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = import.meta.dirname;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); //Récupérer les données envoyer depuis un formulaire

app.use(express.static(path.join(__dirname, "public")));

app.use(session);

app.use(pageRouter);

app.listen(PORT, () => {
    console.log(`Serveur is running at http://localhost:${PORT}`)
});