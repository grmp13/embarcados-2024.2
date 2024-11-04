const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const express = require('express');


const serviceAccount = require('./firebase-key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://projetoembarcados-16eb8-default-rtdb.firebaseio.com'
});

const db = admin.database();
const app = express();
app.use(bodyParser.json());
const PORT = 3000;


app.get('/getEstado', async (req, res) => {
    try {
        const ref = db.ref('/estado');
        const snapshot = await ref.once('value');
        const data = snapshot.val();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('Erro ao buscar dados: ' + error.message);
    }
});


app.post('/postEstado', async (req, res) => {
    try {
        const ref = db.ref('/estado');
        const newData = req.body; 
        await ref.set(newData);
        res.status(200).send('Dados enviados com sucesso');
    } catch (error) {
        res.status(500).send('Erro ao enviar dados: ' + error.message);
    }
});

app.get('/getQtdRacao', async (req, res) => {
    try {
        const ref = db.ref('/qtdracao'); 
        const snapshot = await ref.once('value');
        const data = snapshot.val();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('Erro ao buscar dados: ' + error.message);
    }
});


app.post('/postQtdRacao', async (req, res) => {
    try {
        const ref = db.ref('/qtdracao'); 
        const newData = req.body;
        await ref.set(newData);
        res.status(200).send('Dados enviados com sucesso');
    } catch (error) {
        res.status(500).send('Erro ao enviar dados: ' + error.message);
    }
});

app.get('/getTipo', async (req, res) => {
    try {
        const ref = db.ref('/tipo'); 
        const snapshot = await ref.once('value');
        const data = snapshot.val();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('Erro ao buscar dados: ' + error.message);
    }
});


app.post('/postTipo', async (req, res) => {
    try {
        const ref = db.ref('/tipo'); 
        const newData = req.body;
        await ref.set(newData);
        res.status(200).send('Dados enviados com sucesso');
    } catch (error) {
        res.status(500).send('Erro ao enviar dados: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });