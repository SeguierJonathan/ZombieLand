import { Router } from 'express';
import { accountPage, logInPage, inscriptionPage } from '../../controllers/users.controller.js';
import { getAll } from '../../controllers/activities.controller.js'
import { homePage } from '../../controllers/pages.controller.js';
import { isAuth, preventIfLoggedIn } from '../../middlewares/auth.middleware.js';

const router = Router();

// Home page
router.get("/", homePage);
// Liste des activitées
router.get('/activitées', getAll);
// Mon compte
router.get('/mon-compte', isAuth, accountPage);
//Page de création de compte 
router.get('/inscription', preventIfLoggedIn, inscriptionPage);
//Page pour se Connecter à son compte
router.get('/connexion', preventIfLoggedIn, logInPage);
//Page d'erreur 500
router.get('/500', (req, res) => { res.status(500).nrender("500") });


export default router;