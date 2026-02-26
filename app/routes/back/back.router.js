import { Router } from 'express';
import { connected, createAccount, updateAccount, deleteAccount } from '../../controllers/users.controller.js';
import { validateAuthLogin, validateAuthRegister, isAuth, validateUpdateAccount } from '../../middlewares/auth.middleware.js';
import { logout } from '../../controllers/auth.controller.js';

const router = Router();

router.post('/mon-compte', isAuth, validateUpdateAccount, updateAccount);

router.post('/inscription', validateAuthRegister, createAccount);

router.post('/connexion', validateAuthLogin, connected);

router.post('/user/delete', isAuth, deleteAccount);

router.post('/auth/logout', isAuth, logout);

export default router;