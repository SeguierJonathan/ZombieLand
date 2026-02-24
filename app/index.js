import express from 'express';
import "dotenv/config";
import path from 'node:path';
import pageRouter from "./routes/pages.router.js";


const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = import.meta.dirname;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(pageRouter);

app.listen(PORT, () => {
    console.log(`Serveur is running at http://localhost:${PORT}`)
});