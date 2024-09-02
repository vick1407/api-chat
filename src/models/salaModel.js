
const db = require('./db');


const criarSala = async (dados) => {
    const { nome } = dados;
    const sala = { nome, mensagens: [] };
    return await db.insertOne('salas', sala);
};

const listarSalas = async () => {
    return await db.findAll('salas');
};

const encontrarSalaPorId = async (id) => {
    return await db.findOne('salas', { _id: id });
};

const adicionarMensagem = async (id, mensagem) => {
    return await db.updateOne('salas', { _id: id }, { $push: { mensagens: mensagem } });
};

module.exports = { criarSala, listarSalas, encontrarSalaPorId, adicionarMensagem };
