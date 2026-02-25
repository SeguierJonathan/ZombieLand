import {Router} from 'express';
import { createAccount, inscriptionPage } from '../controllers/createAccount.controller.js';
import { connected, logInPage } from '../controllers/log_in.controller.js';
import { getAll, homePage, accountPage } from '../controllers/pages.controller.js';


const router = Router();
// Home page
router.get("/", homePage);

// Liste des activitées
router.get('/activites', getAll);
router.get('/mon-compte', accountPage );

//Page de création de compte 
router.get('/inscription', inscriptionPage);
router.post('/inscription', createAccount );

//Page pour se Connecter à son compte
router.get('/connexion', logInPage);
router.post('/connexion', connected);


export default router;
