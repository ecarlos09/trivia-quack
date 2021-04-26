const Game = require('../models/Game');

const getAll = async(req, res) => {
    try {
        const games = await Game.all
        res.status(200).json({data: games})
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }    
};

const getById = async (req, res) => {
    try {
        const id = req.params.id
        const game = await Game.findById(id)
        res.status(200).json({data: game})
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
};

const postGame = async (req, res) => {
    try {
        const game = await Game.create()
        res.status(200).json({data: game})
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
};

module.exports = { getAll, getById, postGame };