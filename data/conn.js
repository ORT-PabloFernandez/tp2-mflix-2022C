require('dotenv').config();
const mongoclient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:tp2@cluster0.3bm3a.azure.mongodb.net/?retryWrites=true&w=majority";
const client = new mongoclient(uri);

let instance = null;

async function getConnection(){
    if(instance == null){
        instance = await client.connect();
    }
    return instance;
}

module.exports = {getConnection};