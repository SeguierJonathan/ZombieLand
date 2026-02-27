import { Router } from 'express';
import { createAccount, updateAccount, deleteAccount } from '../../controllers/users.controller.js';
import { validateAuthLogin, validateAuthRegister, validateUpdateAccount } from '../../middlewares/auth.middleware.js';
import { login, logout } from '../../controllers/auth.controller.js';
import { createBooking, updateBooking, deleteBooking } from '../../controllers/bookings.controller.js';
import { validateBooking } from '../../middlewares/bookings.middleware.js';
import { isAuth } from '../../middlewares/common.middleware.js';



const router = Router();

router.post('/mon-compte', isAuth, validateUpdateAccount, updateAccount);

router.post('/inscription', validateAuthRegister, createAccount);


router.post('/user/delete', isAuth, deleteAccount);

router.post('/reservation', isAuth, validateBooking, createBooking);

router.post("/mes-reservations/:id/edit", isAuth, validateBooking, updateBooking);

router.post("/mes-reservations/:id/delete", isAuth, deleteBooking);


router.post('/auth/login', validateAuthLogin, login);
router.post('/auth/logout', isAuth, logout);

export default router;