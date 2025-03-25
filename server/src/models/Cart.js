
import mongoose, { Schema } from "mongoose";

const cartsCollection = "carts"

const cartSchema = new Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
})

const Cart = mongoose.model("Cart", cartSchema, cartsCollection)

export default Cart