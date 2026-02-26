import session from "express-session"
import "dotenv/config";

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 10 * 60 * 1000 // 600 000 ms = 10 minutes
    }
})

export default sessionMiddleware;