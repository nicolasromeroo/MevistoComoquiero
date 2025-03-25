
import { Router } from "express";
import { addProduct, deleteProduct, getPoducts, getProductById, updateProduct } from "../controllers/product.controller.js";

const router = Router()

router.post("/addProduct", addProduct)
router.get("/getProducts", getPoducts)
router.get("/getProduct/:id", getProductById)
router.put("/updateProduct/:id", updateProduct)
router.delete("/deleteProduct/:id", deleteProduct)

export default router