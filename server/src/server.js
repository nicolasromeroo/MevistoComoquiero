import express from "express"
import dotenv from "dotenv"
import connectToMongoDB from "./db/dataBase.js"
import authRoutes from "./routes/auth.router.js"
import productsRoutes from "./routes/products.router.js"
import cartsRoutes from "./routes/carts.router.js"

dotenv.config()

connectToMongoDB()

const app = express()

app.use(express.json())
app.use("/api", authRoutes)
app.use("/api", productsRoutes)
app.use("/api", cartsRoutes)

app.listen(8080, () => {
    console.log("Servidor express creado con éxito.")
});


export default app



