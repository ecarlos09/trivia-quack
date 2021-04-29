const router = require('express').Router();

const { getGames, 
        getScores, 
        getById, 
        getSimple, 
        postGame, 
        postPlayer, 
        postAnswers, 
        postResults } = require('../controllers/games');

router.get('/', getGames);
router.get('/scores', getScores);
router.get('/:id', getById);
router.get('/:id/simple', getSimple);

router.post('/', postGame);
router.post('/:id/players/:player', postPlayer);
router.post('/:id/players/:player/answers', postAnswers);
router.get('/:id/results', postResults);

module.exports = router