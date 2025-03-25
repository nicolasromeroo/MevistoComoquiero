
import { Router } from "express";
import { addProductToCart, createCart, deleteCart, getCartById, getCarts } from "../controllers/cart.controller.js";

const router = Router()

router.post("/createCart", createCart)
router.get("/getCarts", getCarts)
router.get("/getCartById/:id", getCartById)
router.post("/addProductToCart/:id", addProductToCart)
router.delete("/deleteCart/:id", deleteCart)

export default router