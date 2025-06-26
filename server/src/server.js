import express from "express"
import cors from "cors"

import connectToMongoDB from "./db/dataBase.js"

import authRoutes from "./routes/auth.router.js"
import productsRoutes from "./routes/products.router.js"
import cartsRoutes from "./routes/carts.router.js"
import cardRoutes from "./routes/card.router.js"

connectToMongoDB()

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoutes)
app.use("/api/products", productsRoutes)
app.use("/api/cart", cartsRoutes)
app.use("/api/cards", cardRoutes)

app.listen(8080, () => {
    console.log("Servidor express creado con éxito.")
});

export default app



