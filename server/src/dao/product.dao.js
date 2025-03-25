import Product from "../models/Product.js"

class ProductDao {
    async getAll() {
        const products = await Product.find()
        return products
    }

    async getById(pid) {
        const product = await Product.findById(pid)
        return product
    }

    async create(data) {
        const product = await Product.create(data)
        return product
    }

    async update(pid, data) {
        const productUpdate = await Product.findByIdAndUpdate(pid, data)
        return productUpdate
    }

    async deleteOne(pid) {
        const product = await Product.deleteOne({ _id: pid })
        return product
    }

    async getByTitle(title) {
        const product = await Product.findOne({ title })
        return product
    }
}

export const productDao = new ProductDao()