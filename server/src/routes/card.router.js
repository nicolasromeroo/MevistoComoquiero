import { Router } from "express"
import { createCard, deleteCard, getCard, getCards, getCardWithProducts, updateCard } from "../controllers/card.controller.js"
import { authenticate } from "../middlewares/auth.middleware.js"
import { isAdmin } from "../middlewares/isAdmin.middleware.js"

const router = Router()

// públicoas
router.get("/catalogo", getCards)
router.get('/catalogo/id/:id', getCard);
router.get('/catalogo/slug/:slug', getCardWithProducts);

// admin
router.post("/createCard", authenticate, isAdmin, createCard)
router.put("/updateCard/:id", authenticate, isAdmin, updateCard)
router.delete("/deleteCard/:id", authenticate, isAdmin, deleteCard)

export default router