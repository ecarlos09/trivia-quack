const router = require('express').Router();

const { Game, Questions } = require('../models/game');

router.post('/', async (req, res) => {
    try {
        const game = await Game.create(req.query)
        res.status(200).json(new Questions(game.ops[0]))
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }

});


module.exports = router