import {Router} from 'express';
import { getAll } from '../controllers/pages.controller.js';

const router = Router();

router.get("/", homePage);
router.get('/activitées', getAll);

export default router;
