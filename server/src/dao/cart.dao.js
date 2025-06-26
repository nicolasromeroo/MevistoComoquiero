
import Cart from "../models/Cart.js"

class CartDao {
    async getById(userId) {
        const cart = await Cart.findOne(userId).populate('products.product', 'title price thumbnail')
        if (!cart) {
            throw new Error('Carrito no encontrado')
        }
    }

    async addItem(userId, productId, quantity = 1) {
        const cart = await this.getById(userId);
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId.toString());
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();

        return cart;
    }

    async removeItem(userId, productId) {
        const cart = await this.getById(userId);
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId.toString());
        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            await cart.save();
        } else {
            throw new Error('Producto no encontrado en el carrito');
        }

        return cart;
    }

    // async getAll() {
    //     const carts = await Cart.find()
    //     return carts
    // }

    // async create(data) {
    //     const cart = await Cart.create(data)
    //     return cart
    // }

    // async update(cid, data) {
    //     const cartUpdate = await Cart.findByIdAndUpdate(cid, { $set: data }, { new: true });

    //     return cartUpdate
    // }

    // async deleteOne(cid) {
    //     const cart = await Cart.deleteOne({ _id: cid })
    //     return cart
    // }
}

export const cartDao = new CartDao()