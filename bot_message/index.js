const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()


const MongoClient = require('mongodb').MongoClient;
const url = "mongoDBurl";
app.use(cors());
app.use(express.json());

app.post('/partner', async (req, res) => {

    const data = req.body;

    try {
      const client = await MongoClient.connect(url);
      const db = client.db('Message');
      const result = await db.collection('formularios').insertOne(data);
      console.log('Documento inserido no MongoDB:', result.insertedId);
      res.status(200).send('Documento inserido no banco de dados');
      client.close();
    } catch (err) {
      console.error('Erro ao inserir documento no MongoDB:', err);
      res.status(500).send('Erro interno do servidor');
    }
    
});


const port = 3002;
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
})