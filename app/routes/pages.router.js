import { Router } from 'express';
import { createAccount, inscriptionPage } from '../controllers/createAccount.controller.js';
import { connected, logInPage } from '../controllers/log_in.controller.js';
import { getAll, homePage, accountPage } from '../controllers/pages.controller.js';
import { validateAuthLogin, validateAuthRegister, isAuth, preventIfLoggedIn } from '../middlewares/auth.middleware.js';


const router = Router();
// Home page
router.get("/", homePage);

// Liste des activitées
<<<<<<< HEAD
router.get('/activites', getAll);
router.get('/mon-compte', accountPage );
=======
router.get('/activitées', getAll);
router.get('/mon-compte', isAuth, accountPage);
>>>>>>> 7a9190841ff435dbf2c08148b161cc6f39c575dd

//Page de création de compte 
router.get('/inscription', preventIfLoggedIn, inscriptionPage);
router.post('/inscription', validateAuthRegister, createAccount);

//Page pour se Connecter à son compte
router.get('/connexion', preventIfLoggedIn, logInPage);
router.post('/connexion', validateAuthLogin, connected);

export default router;
