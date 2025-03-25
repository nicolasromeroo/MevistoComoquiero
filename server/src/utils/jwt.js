
import jwt from "jsonwebtoken"
import envsConfig from "../config/envs.config.js"

// GENERAR token
export const generateToken = (user) => {
    // payload con info del usuario a almacenar
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email
    }

    // expiracion de 1 hora
    const token = jwt.sign(payload, envsConfig.SECRET_KEY, { expiresIn: "1h" })

    return token
}

// VERIFICAR token
export const verifyToken = (token) => {
    try {
        // verifica el token y decodifica el payload
        const decoded = jwt.verify(token, envsConfig.SECRET_KEY)

        return decoded
    } catch (err) {
        throw new Error("Token inválido o expirado.")
    }
}