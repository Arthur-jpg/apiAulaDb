require('dotenv').config(); // Carrega as variáveis de ambiente do .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000; // Porta definida no .env ou 3000

console.log('Mongo URI:', process.env.MONGO_URI); // Adicione este log
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB com sucesso!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));


// Modelo de Filme
const Filme = mongoose.model('Filme', { 
    title: String,
    description: String,
    image_url: String,
    trailer_url: String
});

// Endpoint para adicionar um filme
app.post('/add-movie', async (req, res) => {
    try {
        const filme = new Filme(req.body);
        await filme.save();
        res.status(201).send(filme);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao adicionar o filme.' });
    }
});

// Endpoint para listar todos os filmes
app.get('/list-movies', async (req, res) => {
    try {
        const filmes = await Filme.find();
        res.status(200).send(filmes);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao listar os filmes.' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
