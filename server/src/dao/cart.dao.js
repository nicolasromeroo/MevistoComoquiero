
import Cart from "../models/Cart.js"

class CartDao {
    async getAll() {
        const carts = await Cart.find()
        return carts
    }

    async getById(cid) {
        const cart = await Cart.findById(cid)
        return cart
    }

    async create(data) {
        const cart = await Cart.create(data)
        return cart
    }

    async update(cid, data) {
        const cartUpdate = await Cart.findByIdAndUpdate(cid, { $set: data }, { new: true });

        return cartUpdate
    }

    async deleteOne(cid) {
        const cart = await Cart.deleteOne({ _id: cid })
        return cart
    }
}

export const cartDao = new CartDao()