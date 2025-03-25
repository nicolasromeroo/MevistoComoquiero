
import { Router } from "express";
import { login, logout, profile, register } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/profile", authenticate, profile)

export default router