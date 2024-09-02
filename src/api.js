const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const db = require('./models/db');
const usuarioController = require('./controllers/usuarioController');


const salaController = {
    get: async () => {
        return await db.findAll('salas');
    },
    create: async (sala) => {
        return await db.insertOne('salas', sala);
    },
    addMessage: async (salaId, mensagem) => {
        return await db.insertOne('mensagens', {
            salaId,
            mensagem,
            criadoEm: new Date(),
        });
    },
    getMessages: async (salaId) => {
        const mensagens = await db.findAll('mensagens');
        return mensagens.filter(msg => msg.salaId === salaId);
    },
    removeUserFromSala: async (usuarioId, salaId) => {
        // Lógica para remover o usuário da sala
        // Atualize o banco de dados conforme necessário
    },
    addUserToSala: async (usuarioId, salaId) => {
        // Lógica para adicionar o usuário à sala
        // Atualize o banco de dados conforme necessário
    }
};

router.get('/', (req, res) => {
    res.status(200).send("<h1>API-CHAT</h1>");
});

router.get('/sobre', (req, res) => {
    res.status(200).send({
        "nome": "API-CHAT",
        "versão": "0.1.0",
        "autor": "Cândido Farias"
    });
});

router.get('/salas', async (req, res) => {
    try {
        let resp = await salaController.get();
        res.status(200).send(resp);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao buscar salas' });
    }
});

router.post('/salas', async (req, res) => {
    try {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).send({ error: 'Nome da sala é necessário' });
        }

        let sala = await salaController.create({ nome });
        res.status(201).send(sala);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao criar sala' });
    }
});

router.post('/salas/mensagens', async (req, res) => {
    try {
        const { salaId, mensagem } = req.body;

        if (!salaId || !mensagem) {
            return res.status(400).send({ error: 'Sala ID e mensagem são necessários' });
        }

        const resultado = await salaController.addMessage(salaId, mensagem);
        res.status(201).send(resultado);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao adicionar mensagem' });
    }
});

router.get('/salas/mensagens', async (req, res) => {
    try {
        const { salaId } = req.query;

        if (!salaId) {
            return res.status(400).send({ error: 'Sala ID é necessário' });
        }

        const mensagens = await salaController.getMessages(salaId);
        res.status(200).send(mensagens);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao listar mensagens' });
    }
});

router.post('/entrar', async (req, res) => {
    try {
        const { apelido } = req.body;
        if (!apelido) {
            return res.status(400).send({ error: 'Apelido é necessário' });
        }

        const usuario = await usuarioController.registrarUsuario(apelido);
        res.status(201).send(usuario);
    } catch (error) {
        console.error('Erro ao registrar usuário:', error.message);
        res.status(500).send({ error: 'Erro ao registrar usuário' });
    }
});

router.post('/entrar-sala', async (req, res) => {
    try {
        const { usuarioId, salaId } = req.body;
        if (!usuarioId || !salaId) {
            return res.status(400).send({ error: 'Usuário e Sala são necessários' });
        }

        await salaController.addUserToSala(usuarioId, salaId);
        res.status(200).send({ mensagem: 'Usuário entrou na sala com sucesso' });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao entrar na sala' });
    }
});

router.post('/sair-sala', async (req, res) => {
    try {
        const { usuarioId, salaId } = req.body;
        if (!usuarioId || !salaId) {
            return res.status(400).send({ error: 'Usuário e Sala são necessários' });
        }

        await salaController.removeUserFromSala(usuarioId, salaId);
        res.status(200).send({ mensagem: 'Usuário saiu da sala com sucesso' });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao sair da sala' });
    }
});

module.exports = router;
