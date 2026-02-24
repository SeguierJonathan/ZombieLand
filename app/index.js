import express from 'express';
import "dotenv/config";
import session from "express-session"

const app = express();
const PORT = process.env.PORT || 3000;

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

app.get("/", (req, res) => {
    res.send("hello world")
});

app.listen(PORT, () => {
    console.log(`Serveur is running at http://localhost:${PORT}`)
});