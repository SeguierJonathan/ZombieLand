import {Router} from 'express';
import { getAll, homePage, accountPage } from '../controllers/pages.controller.js';


const router = Router();

router.get("/", homePage);
router.get('/activitées', getAll);
router.get('/mon-compte', accountPage );

export default router;
