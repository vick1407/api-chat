const db = require('../models/db');
const { ObjectId } = require('mongodb');

const salaController = {
    get: async () => {
        return await db.findAll('salas');
    },
    create: async (sala) => {
        return await db.insertOne('salas', sala);
    },
    addMessage: async (salaId, mensagem) => {
        return await db.insertOne('mensagens', {
            salaId: ObjectId(salaId),
            mensagem,
            criadoEm: new Date(),
        });
    },
    getMessages: async (salaId) => {
        const mensagens = await db.findAll('mensagens');
        return mensagens.filter(msg => msg.salaId.toString() === salaId);
    },
    removeUserFromSala: async (usuarioId, salaId) => {

    },
    addUserToSala: async (usuarioId, salaId) => {

    },
    apagarSala: async (salaId) => {
        const id = ObjectId(salaId);
        await db.deleteMany('mensagens', { salaId: id });
        return await db.deleteOne('salas', { _id: id });
    }
};

module.exports = salaController;
