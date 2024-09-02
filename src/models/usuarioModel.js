const { insertOne } = require('./db');

const { insertOne } = require('./db');

const inserirUsuario = async (apelido) => {
    try {
        const usuario = { apelido, criadoEm: new Date() };
        const result = await insertOne('usuarios', usuario);
        if (!result.insertedId) {
            throw new Error('Falha ao inserir o usuário');
        }
        return { _id: result.insertedId, ...usuario };
    } catch (error) {
        console.error("Erro ao inserir usuário:", error.message);
        throw error;
    }
};

module.exports = { inserirUsuario };



