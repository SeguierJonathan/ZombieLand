import {Router} from 'express';
import { getAll, homePage } from '../controllers/pages.controller.js';
import { createAccount, inscriptionPage } from '../controllers/createAccount.controller.js';
import { connected, logInPage } from '../controllers/log_in.controller.js';

const router = Router();
// Home page
router.get("/", homePage);

// Liste des activitées
router.get('/activitées', getAll);

//Page de création de compte 
router.get('/inscription', inscriptionPage);
router.post('/inscription', createAccount );

//Page pour se Connecter à son compte
router.get('/connexion', logInPage);
router.post('/connexion', connected);


export default router;
