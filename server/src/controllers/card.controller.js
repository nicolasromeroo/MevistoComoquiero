import { cardDao } from "../dao/card.dao.js"
import Product from "../models/Product.js"
import Joi from "joi"
import slugify from "slugify"

export const getCards = async (req, res) => {
    try {
        const cards = await cardDao.getAll()

        return res.status(200).json(cards)
    } catch (err) {
        return res.status(500).json({ msg: "Error al traer cards: ", err })
    }
}

export const getCard = async (req, res) => {
    const { id } = req.params

    try {
        const card = await cardDao.getById(id)

        return res.status(200).json(card)
    } catch (err) {
        return res.status(500).json({ msg: "Error al traer card: ", err })
    }
}

export const getCardWithProducts = async (req, res) => {
    const { slug } = req.params;
    const card = await cardDao.getBySlug(slug);
    if (!card) return res.status(404).json({ error: 'Catálogo no encontrado' });

    const products = await Product.find({ catalogIds: card._id });
    res.json({ catalog, products });
};

export const createCard = async (req, res) => {
    try {
        const schema = Joi.object({
            title: Joi.string().trim().min(3).max(60).required(),
            description: Joi.string().trim().min(5).max(280).required(),
            imgBanner: Joi.string().uri().required()          // URL válida
        });

        const { value, error } = schema.validate(req.body);
        if (error) return res.status(400).json({ error: error.message });

        const baseSlug = slugify(value.title, { lower: true, strict: true });
        let slug = baseSlug;
        let counter = 1;

        while (await cardDao.exists({ slug })) {
            slug = `${baseSlug}-${counter++}`;
        }

        const newCard = await cardDao.create({ ...value, slug });
        return res.status(201).json(newCard);

    } catch (err) {
        console.error('[createCard] ', err);
        if (err.code === 11000) {
            return res.status(409).json({ error: 'El título ya existe' });
        }
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const updateCard = async (req, res) => {
    const { title, description, imgBanner } = req.body
    const id = req.params

    try {
        const cardUpdate = await cardDao.update(id, {
            title, description, imgBanner
        }, { new: true })

        return res.status(200).json(cardUpdate)
    } catch (err) {
        return res.status(500).json({ msg: "Error al actualizar card: ", err })
    }
}

export const deleteCard = async (req, res) => {
    const id = req.params

    try {
        const card = await cardDao.deleteOne(id)

        return res.status(200).json({ msg: "Card eliminada", card })
    } catch (err) {
        return res.status(500).json({ msg: "Error al eliminar card: ", err })
    }
}