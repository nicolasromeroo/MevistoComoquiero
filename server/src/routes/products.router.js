
import { Router } from "express";
import { addProduct, deleteProduct, getProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

const router = Router()

router.get("/", getProducts)
router.get("/getProduct/:id", getProductById)

router.post("/addProduct", isAdmin, addProduct)
router.put("/updateProduct/:id", isAdmin, updateProduct)
router.delete("/deleteProduct/:id", isAdmin, deleteProduct)

export default router