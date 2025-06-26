

import bcrypt from "bcryptjs";

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (password, userPassword) => {
    return bcrypt.compareSync(password, userPassword);
};