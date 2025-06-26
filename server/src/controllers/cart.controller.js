
import { cartDao } from "../dao/cart.dao.js"
import { productDao } from "../dao/product.dao.js"

export const getCarts = async (req, res) => {
    try {
        const carts = await cartDao.getAll()

        if (!carts) return res.status(500).json({ message: "Carritos no encontrados." })

        res.json(carts)
    } catch (err) {
        res.status(500).json({ message: "Error al obtener carritos." })
    }
}

export const getCartById = async (req, res) => {
    try {
        const cart = await cartDao.getById(req.params.id)

        if (!cart) return res.status(404).json({ message: "Carrito no encontrado." })

        res.json(cart)
    } catch (err) {
        console.error("Error: ", err)
        res.status(500).json({ message: "Error al obtener carrito." })
    }
}

export const createCart = async (req, res) => {
    const { products, quantity } = req.body

    try {
        const newCart = await cartDao.create({ products })

        res.status(201).json(newCart)
    } catch (err) {
        res.status(500).json({ message: "Error al generar carrito." })
    }
}

export const addProductToCart = async (req, res) => {
    const { pid, quantity } = req.body
    const { id: cid } = req.params

    try {
        const cart = await cartDao.getById(cid)

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado." })
        }

        const product = await productDao.getById(pid)
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado." })
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: "Stock insuficiente." })
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === pid)

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity
        } else {
            cart.products.push({ product: pid, quantity })
        }

        product.stock -= quantity

        await product.save()

        await cart.save()

        res.json({ message: "Producto añadido al carrito.", cart })
    } catch (err) {
        console.error("Error :", err)
        res.status(500).json({ message: "Error al añadir producto al carrito." })
    }
}

export const deleteCart = async (req, res) => {
    try {
        const { cid } = req.params

        const deletedCart = await cartDao.deleteOne(cid)

        if (!deletedCart) return res.status(404).json({ message: "Carrito no encontrado." })

        res.json({ message: "Carrito eliminado." })
    } catch (err) {
        console.error('Error al eliminar el carrito:', err);
        res.status(500).json({ message: "Error al eliminar el carrito." });
    }
}