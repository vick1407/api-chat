
const db = require('../models/db');
const { gerarToken } = require('../util/token');

const registrarUsuario = async (apelido) => {
    try {
        if (!apelido) {
            throw new Error('Apelido é necessário');
        }

        const usuario = await db.insertOne('usuarios', { apelido });
        const token = gerarToken(usuario._id);
        return { usuario, token };
    } catch (error) {
        console.error("Erro ao registrar usuário:", error.message);
        throw error;
    }
};

module.exports = { registrarUsuario };
