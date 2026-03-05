import { Router } from 'express';
import { createAccount, updateAccount, deleteAccount, deleteUsers, updateUserRole } from '../../controllers/users.controller.js';
import { validateAuthLogin, validateAuthRegister, validateUpdateAccount } from '../../middlewares/auth.middleware.js';
import { login, logout } from '../../controllers/auth.controller.js';
import { createBooking, updateBooking, deleteBooking, AdminUpdateBooking, AdminDeleteBooking } from '../../controllers/bookings.controller.js';
import { validateBooking } from '../../middlewares/bookings.middleware.js';
import { isAllowed, isAuth, validateId } from '../../middlewares/common.middleware.js';
import { deleteActivities, newActivityAdmin, updateActivities } from '../../controllers/activities.controller.js';
import { deleteCategoriesAdmin, updateCategoriesAdmin,  createCategoriesAdmin } from '../../controllers/categories.controller.js';
import { validateCategoriesCreation, validateCategoriesUpdate } from '../../middlewares/categories.middleware.js';
import { validatePrice } from '../../middlewares/price.middleware.js'
import { updatePricesAdmin } from '../../controllers/prices.controller.js';
import { validateActivitiesCreate, validateActivitiesUpdate } from '../../middlewares/activities.middleware.js';

const router = Router();

router.post('/mon-compte', isAuth, validateUpdateAccount, updateAccount);

router.post('/inscription', validateAuthRegister, createAccount);


router.post('/user/delete', isAuth, deleteAccount);

router.post('/reservation', isAuth, validateBooking, createBooking);

router.post("/mes-reservations/:id/edit", isAuth, validateBooking, updateBooking);

router.post("/mes-reservations/:id/delete", isAuth, deleteBooking);


router.post('/auth/login', validateAuthLogin, login);
router.post('/auth/logout', isAuth, logout);

router.post('/admin/activities/create', isAuth, isAllowed("admin"), validateActivitiesCreate, newActivityAdmin);
router.post('/admin/activities/:id/update', isAuth, isAllowed("admin"), validateId, validateActivitiesUpdate, updateActivities);
router.post('/admin/activities/:id/delete', isAuth, isAllowed("admin"), validateId, deleteActivities);

router.post("/admin/users/delete/:id", isAuth, isAllowed("admin"), validateId, deleteUsers);
router.post("/admin/users/role/:id", isAuth, isAllowed("admin"), validateId, updateUserRole);

router.post("/admin/bookings/:id/delete", isAuth, isAllowed("admin"), validateId, AdminDeleteBooking);
router.post("/admin/bookings/:id/update", isAuth, isAllowed("admin"), validateId, validateBooking, AdminUpdateBooking);


router.post("/admin/categories/create", isAuth, isAllowed("admin"), validateCategoriesCreation, createCategoriesAdmin);
router.post("/admin/categories/:id/delete", isAuth, isAllowed("admin"), validateId, deleteCategoriesAdmin);
router.post("/admin/categories/:id/update", isAuth, isAllowed("admin"), validateId, validateCategoriesUpdate, updateCategoriesAdmin);

router.post("/admin/tarifs/:id/update", isAuth, isAllowed("admin"), validatePrice, updatePricesAdmin);

export default router;