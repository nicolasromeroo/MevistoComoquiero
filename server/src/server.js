import express from "express"
import dotenv from "dotenv"
import connectToMongoDB from "./db/dataBase.js"

dotenv.config()

connectToMongoDB()

const app = express()

app.use(express.json())

export default app

console.log("Servidor express creado con éxito.")




