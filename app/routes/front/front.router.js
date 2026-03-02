import { Router } from 'express';
import { accountPage, logInPage, inscriptionPage } from '../../controllers/users.controller.js';
import { getAll, getAllByCategory} from '../../controllers/activities.controller.js'
import { adminPage, unauthorized, homePage, informationsPage, errorPage, noFoundPage, getAllUsers } from '../../controllers/pages.controller.js';
import { renderActivityDetail } from '../../controllers/activity.controller.js';
import { bookingPage, getMesReservations } from '../../controllers/bookings.controller.js';
import { isAllowed, isAuth, preventIfLoggedIn } from '../../middlewares/common.middleware.js';


const router = Router();

// Home page
router.get("/", homePage);
// Liste des activitées
router.get('/activites', getAll);
// page de test admin
router.get("/admin", isAuth, isAllowed("admin"), adminPage);
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
//Page 403
router.get('/403', unauthorized);
//Page 404
router.get('/404', noFoundPage);
//Page d'erreur 500
router.get('/500', errorPage);
// Détail d'une activité
router.get('/activites/:id', renderActivityDetail);
//Activités filtré par catégorie
router.get('/activites/categories/:id', getAllByCategory);
// Affichage de tous les utilisateurs
router.get('/menu-administrateur/users', getAllUsers);

export default router;