import { Router } from "express";
import checkToken from '../middlewares/checkToken.js'
import { GET,POST,PUT,DELETE} from "../controllers/subcategories.controller.js";

const router=Router()
router.get('/subcategories',GET);
router.get('/subcategories/:sub_category_id',GET);
router.post('/subcategories',checkToken,POST);
router.delete('/subcategories/:sub_category_id',checkToken,DELETE);
router.put('/subcategories/:sub_category_id',checkToken,PUT);

export default router;