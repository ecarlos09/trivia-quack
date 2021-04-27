const router = require('express').Router();

const { Game, Questions } = require('../models/game');

router.get('/', async (req, res) => {
    try {
        const id = req.params.id
        const games = await Game.all
        res.status(200).json({games})
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const game = await Game.findById(id)
        res.status(200).json(new Questions(game))
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
});

router.post('/', async (req, res) => {
    try {
        const game = await Game.create(req.query)
        res.status(200).json(game.ops[0]._id)
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
});

router.post('/:id/players/:player', async (req, res) => {
    try {
        const game = await Game.addPlayers(req.params.id, req.params.player)
        res.status(200).json(game)
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
});

router.post('/:id/players/:player/answers', async (req, res) => {
    try {
        const game = await Game.addAnswers(req.params.id, req.params.player, req.body)
        res.status(200).json(game)
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
});

router.get('/:id/results', async (req, res) => {
    try {
        const game = await Game.getResults(req.params.id)
        res.status(200).json(game)
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
});



module.exports = router