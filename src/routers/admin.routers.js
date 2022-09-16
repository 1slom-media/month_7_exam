import { Router } from "express";
import {LOGIN} from "../controllers/admin.controller.js";
import validation from "../middlewares/validation.js";

const router=Router()
router.post('/login',validation,LOGIN);
export default router;