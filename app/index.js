import express from 'express';
import "dotenv/config";
import activity from './routes/pages.router.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine','ejs' )

app.use(activity);

app.listen(PORT, () => {
    console.log(`Serveur is running at http://localhost:${PORT}`)
}) ;