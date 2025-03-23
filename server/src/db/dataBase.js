
import mongoose from "mongoose";
import envsConfig from "../config/envs.config.js";

async function connectToMongoDB() {
    try {
        await mongoose.connect(envsConfig.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("Conectado a MongoDB.")

    } catch (err) {
        console.log("NO conectado a MongoDB.")
        console.error(err)
    }
}

export default connectToMongoDB
