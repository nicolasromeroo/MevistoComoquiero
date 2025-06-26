import Card from "../models/Card.js"


class CardDao {
    async exists(filter) {
        const card = await Card.exists(filter)
        return card
    }

    async getAll() {
        const cards = await Card.find()
        return cards
    }

    async getById(pid) {
        const product = await Card.findById(pid)
        return product
    }

    async create(data) {
        const cards = await Card.create(data)
        return cards
    }

    async update(id, data) {
        const cardUpdate = await Card.findByIdAndUpdate(id, data)
        return cardUpdate
    }

    async deleteOne(id) {
        const card = await Card.deleteOne({ _id: id })
        return card
    }

    async getByTitle(title) {
        const card = await Card.findOne({ title })
        return card
    }

    async getBySlug(slug) {
        const card = await Card.findOne({ slug })
        return card
    }
}

export const cardDao = new CardDao()