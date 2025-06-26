
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Product from '../models/Product.js';

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mvcq', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const fakeCatalogIds = [
    new mongoose.Types.ObjectId(), // verano
    new mongoose.Types.ObjectId(), // urbano
    new mongoose.Types.ObjectId(), // casual
    new mongoose.Types.ObjectId(), // invierno
    new mongoose.Types.ObjectId()  // outlet
];

const productos = Array.from({ length: 50 }, (_, i) => {
    const index = i + 1;
    return {
        title: `Producto ${index}`,
        description: `Descripción detallada del producto número ${index}, ideal para todo tipo de ocasión y estilo.`,
        price: Math.floor(Math.random() * 20000) + 3000,
        stock: Math.floor(Math.random() * 100) + 10,
        imagen: `img/producto-${(index % 10) + 1}.jpg`,
        catalogIds: [fakeCatalogIds[index % fakeCatalogIds.length]]
    };
});

async function seedProductos() {
    try {
        await Product.deleteMany({});
        await Product.insertMany(productos);
        console.log('✅ 50 productos insertados con éxito.');
    } catch (err) {
        console.error('❌ Error al insertar productos:', err);
    } finally {
        mongoose.connection.close();
    }
}

seedProductos();
