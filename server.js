const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => res.send('Welcome'));

const gamesController = require("./controllers/games")
server.use('/games', gamesController)

module.exports = server