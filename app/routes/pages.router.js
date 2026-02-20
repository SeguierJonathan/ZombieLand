import { Router } from "express";
import { homePage } from "../controllers/pages.controller.js";

const router = Router();

router.get("/", homePage);

export default router;