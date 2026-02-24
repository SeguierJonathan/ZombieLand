import { Router } from 'express';
import { getAll } from '../controllers/pages.controller.js';
import { homePage } from '../controllers/pages.controller.js';

const router = Router();

router.get("/", homePage);
router.get('/activites', getAll);

export default router;
