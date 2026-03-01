import express from 'express';
import path from 'node:path';
import session from './config/express-session.js';
import frontRouter from "./routes/front/front.router.js"
import backRouter from "./routes/back/back.router.js"
import { errorHandler, initLocals } from './middlewares/common.middleware.js';
import "dotenv/config";
import { noFoundPage } from './controllers/pages.controller.js';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = import.meta.dirname;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); //Récupérer les données envoyer depuis un formulaire

app.use(express.static(path.join(__dirname, "public")));

//use express-session
app.use(session);

//use middleware pour exposer firstName
app.use(initLocals);
app.use(frontRouter);
app.use(backRouter);
app.use(noFoundPage);


app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Serveur is running at http://localhost:${PORT}`)
});