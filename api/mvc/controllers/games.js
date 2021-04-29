const { Game, Questions } = require('../models/game');

const getGames = async (req, res) => {
    try {
        const id = req.params.id
        const games = await Game.all
        res.status(200).json({games})
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
}


const getScores = async (req, res) => {
    try {
        const scores = await Game.allScores
        res.status(200).json({scores})
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id
        const game = await Game.findById(id)
        res.status(200).json(new Questions(game))
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
};

const getSimple = async (req, res) => {
    try {
        const id = req.params.id
        const game = await Game.findById(id)
        const q = game.questions.results[0]
        res.status(200).json({completed: !!game.all_answers, started: !!game.players, type: q.type, category: q.category, length: game.questions.results.length })
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
};

const postGame = async (req, res) => {
    try {
        const game = await Game.create(req.query)
        res.status(200).json(game.ops[0]._id)
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
};

const postPlayer = async (req, res) => {
    try {
        const game = await Game.addPlayers(req.params.id, req.params.player)
        res.status(200).json(game)
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
};

const postAnswers = async (req, res) => {
    try {
        const game = await Game.addAnswers(req.params.id, req.params.player, req.body)
        res.status(200).json(game)
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
};

const postResults = async (req, res) => {
    try {
        const game = await Game.getResults(req.params.id)
        res.status(200).json(game)
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
};

module.exports = { getGames, getScores, getById, getSimple, postGame, postPlayer, postAnswers, postResults }