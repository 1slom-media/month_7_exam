import { Router } from "express";
import checkToken from '../middlewares/checkToken.js'
import { DELETE, GET, POST, PUT} from "../controllers/categories.controller.js";

const router=Router()

router.get('/categories',GET);
router.get('/categories/:category_id',GET);
router.post('/categories',checkToken,POST);
router.delete('/categories/:category_id',checkToken,DELETE);
router.put('/categories/:category_id',checkToken,PUT);

export default router;