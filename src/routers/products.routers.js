import { Router } from "express";
import checkToken from '../middlewares/checkToken.js'
import { DELETE, GET, POST, PUT} from "../controllers/products.controller.js";

const router=Router()
router.get("/products",GET);
router.get("/products/:product_id",GET);
router.post("/products",checkToken,POST);
router.put("/products/:product_id",checkToken,PUT);
router.delete("/products/:product_id",checkToken,DELETE);


export default router;