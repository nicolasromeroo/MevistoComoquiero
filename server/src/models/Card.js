
import mongoose, { Schema } from "mongoose"

const cardsCollection = "cards"

const cardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    imgBanner: {
        type: String,
        required: true
    }
})

const Card = mongoose.model("Card", cardSchema, cardsCollection)

export default Card
