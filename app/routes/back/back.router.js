import { Router } from 'express';
import { connected, createAccount, updateAccount, deleteAccount } from '../controllers/users.controller.js';

import { validateAuthLogin, validateAuthRegister, isAuth, preventIfLoggedIn } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/mon-compte', updateAccount);

router.post('/inscription', validateAuthRegister, createAccount);

router.post('/connexion', validateAuthLogin, connected);

router.post('/user/delete', isAuth, deleteAccount);

export default router;