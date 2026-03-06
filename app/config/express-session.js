import session from "express-session"
import { Client } from "pg";
import connectPgSimple from "connect-pg-simple";
import "dotenv/config";


const pgSession = connectPgSimple(session);

const client = new Client({
    connectionString: process.env.DATABASE_URL
});


const sessionMiddleware = session({
    store: new pgSession({
        client: client,
        tableName: "sessions"
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 1000 //temps d'expiration en milliseconde
    }
})

export default sessionMiddleware;