const express = require("express")
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.use('/', (req, res) => console.log("Welcome to the Express server for Trivia Quack!"))

const gamesController = require("./controllers/games")
app.use('/games', gamesController)

module.exports = app;