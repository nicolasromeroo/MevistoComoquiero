
import mongoose, { Schema } from "mongoose";

const userCollection = "users"

const userSchema = new Schema({
    username: {
        type: string,
        required: true,
    },
    email: {
        type: string,
        required: true,
    },
    password: string
})

const User = Schema(userCollection, userSchema)

export default User