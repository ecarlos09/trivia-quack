const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.getAll);
router.get('/:id', controllers.getById);
router.post('/', controllers.postGame);

module.exports = router;