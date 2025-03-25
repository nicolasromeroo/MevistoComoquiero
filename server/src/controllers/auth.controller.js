
import { userDao } from "../dao/user.dao.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt"

export const register = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const existingUser = await userDao.getByUsername(username)

        if (existingUser) {
            return res.status(400).json({ message: "Usuario existente en la base de datos" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = userDao.create({
            username,
            email,
            password: hashedPassword
        })

        const userSaved = (await newUser).save()

        const token = await generateToken({ id: userSaved._id }).json({
            id: userSaved._id,
            username: userSaved.username
        })
    } catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ message: "Error al registrar usuario" });
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body

    try {
        const userFound = await userDao.getByUsername(username)

        if (!userFound) {
            return res.status(400).json({ message: "Usuario inexistente en la base de datos." })
        }

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) {
            return res.status(500).json({ message: "Usuario o contraseña incorrectos." })
        }

        const token = generateToken(userFound)

        res.cookie("token", token, { httpOnly: true })

        res.json({
            id: userFound._id,
            username: userFound.username,
            token: token
        })

    } catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ message: "Error al registrar usuario" });
    }
}

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    console.log('req.user:', req.user);  // Agregar un log para ver qué contiene req.user

    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Usuario no autenticado." });
    }

    const userFound = await userDao.getById(req.user.id)

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado." })

    return res.json({
        id: userFound._id,
        username: userFound.username
    })
}