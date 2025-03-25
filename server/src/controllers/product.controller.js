
import { productDao } from "../dao/product.dao.js";

export const getPoducts = async (req, res) => {
    try {
        const products = await productDao.getAll()
        res.json(products)
    } catch (err) {
        res.status(500).json({ message: "Error al obtener productos." })
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await productDao.getById(req.params.id)

        if (!product) return res.status(404).json({ message: "Producto no encontrado." })

        res.json(product)
    } catch (err) {
        res.status(500).json({ message: "Error al obtener producto." })
    }
}

export const addProduct = async (req, res) => {
    const { title, description, price, stock } = req.body

    try {
        const newProduct = productDao.create({
            title,
            description,
            price,
            stock
        })

        res.status(201).json(newProduct)
    } catch (err) {
        console.error('Error al cargar el producto:', err);
        res.status(500).json({ message: "Error al cargar el producto" });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const deleteProduct = await productDao.deleteOne(id)

        if (!deleteProduct) return res.status(404).json({ message: "Producto no encontrado." })

        res.json({ message: "Producto eliminado." })
    } catch (err) {
        console.error('Error al eliminar el producto:', err);
        res.status(500).json({ message: "Error al eliminar el producto" });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params
    const updateData = req.body

    try {
        const updatedProduct = await productDao.update(id, updateData)

        if (!updatedProduct) return res.status(404).json({ message: "Producto no encontrado." })

        res.json(updateProduct)
    } catch (err) {
        console.error('Error al actualizar el producto:', err);
        res.status(500).json({ message: "Error al actualizar el producto" });
    }

}