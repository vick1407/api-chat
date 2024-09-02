require('dotenv').config();
const express = require('express');
const { connect } = require('../src/models/db');  
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


const apiRouter = require('../src/api'); 
app.use('/', apiRouter);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Algo deu errado!' });
});


async function startServer() {
    try {
        await connect(); 

        const port = process.env.API_PORT || 5000;
        app.listen(port, () => {
            console.log(`Servidor iniciado na porta ${port}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados ou iniciar o servidor:', error);
        process.exit(1); 
    }
}

startServer();
