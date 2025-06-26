
import jwt from "jsonwebtoken"
import envsConfig from "../config/envs.config.js"

// VERIFICAR token
export const isAdmin = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) return res.status(401).json({ message: "Acceso denegado." })

    try {
        const decoded = jwt.verify(token.split(" ")[1], envsConfig.SECRET_KEY)

        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "No tienes permisos de administrador." })
        }

        next()
    } catch (err) {
        res.status(403).json({ message: "Token inválido." })
    }
}

