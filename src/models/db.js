const { MongoClient } = require('mongodb');

let singleton;

async function connect() {
    if (singleton) return singleton;

    const uri = `mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        await client.connect();
        console.log("Conectado ao MongoDB com sucesso!");
        singleton = client.db(process.env.DB_DATABASE);
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        throw error;
    }
    
    return singleton;
}

const findAll = async (collection) => {
    const db = await connect();
    return await db.collection(collection).find().toArray();
};

const insertOne = async (collection, document) => {
    const db = await connect();
    return await db.collection(collection).insertOne(document);
};

const deleteMany = async (collectionName, query) => {
    const db = await connect();
    return await db.collection(collectionName).deleteMany(query);
};

const deleteOne = async (collectionName, query) => {
    const db = await connect();
    return await db.collection(collectionName).deleteOne(query);
};

module.exports = { connect, findAll, insertOne, deleteMany, deleteOne };
