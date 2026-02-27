import { Router } from 'express';
import { accountPage, logInPage, inscriptionPage } from '../../controllers/users.controller.js';
import { getAll, getAllByCategory } from '../../controllers/activities.controller.js'
import { homePage, informationsPage, errorPage, noFoundPage, aboutPage } from '../../controllers/pages.controller.js';
import { isAuth, preventIfLoggedIn } from '../../middlewares/auth.middleware.js';
import { renderActivityDetail } from '../../controllers/activity.controller.js';
import { bookingPage, getMesReservations } from '../../controllers/bookings.controller.js';



const router = Router();

// Home page
router.get("/", homePage);
// Liste des activitées
router.get('/activites', getAll);
// Mon compte
router.get('/mon-compte', isAuth, accountPage);
//Page de création de compte 
router.get('/inscription', preventIfLoggedIn, inscriptionPage);
//Page pour se Connecter à son compte
router.get('/connexion', preventIfLoggedIn, logInPage);
//Page pour de réservation
router.get('/reservation', isAuth, bookingPage);
//Page pour mes réservations
router.get('/mes-reservations', isAuth, getMesReservations);
//Page pour informations
router.get('/information', informationsPage);
// Page pour A propos
router.get('/a-propos', aboutPage);
//Page 404
router.get('/404', noFoundPage);
//Page d'erreur 500
router.get('/500', errorPage);
// Détail d'une activité
router.get('/activites/:id',renderActivityDetail)
//Activités filtré par catégorie
router.get('/activites/categories/:id', getAllByCategory)

export default router;