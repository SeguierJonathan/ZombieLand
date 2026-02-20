import express from 'express';
import "dotenv/config";
import pageRouter from "./routes/pages.router.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(pageRouter);


app.listen(PORT, () => {
    console.log(`Serveur is running at http://localhost:${PORT}`)
});