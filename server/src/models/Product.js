import mongoose, { Schema } from "mongoose";

const productCollection = "products"

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    catalogIds: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Card'

        }
    ]
})

const Product = mongoose.model("Product", productSchema, productCollection)

export default Product