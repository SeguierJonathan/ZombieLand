import { Router } from 'express';
import { accountPage, connected, logInPage, createAccount, inscriptionPage, deleteAccount } from '../controllers/users.controller.js';
import { getAll } from '../controllers/activities.controller.js'
import { homePage } from '../controllers/pages.controller.js';
import { validateAuthLogin, validateAuthRegister, isAuth, preventIfLoggedIn } from '../middlewares/auth.middleware.js';

const router = Router();

// Home page
router.get("/", homePage);

// Liste des activitées
router.get('/activitées', getAll);

// Mon compte
router.get('/mon-compte', isAuth, accountPage);

//Page de création de compte 
router.get('/inscription', preventIfLoggedIn, inscriptionPage);
router.post('/inscription', validateAuthRegister, createAccount);

//Page pour se Connecter à son compte
router.get('/connexion', preventIfLoggedIn, logInPage);
router.post('/connexion', validateAuthLogin, connected);

router.post('/user/delete', isAuth, deleteAccount)

export default router;