const router = require('express').Router();

const { like } = require('../controllers');
router.post('/like', like.likeFile);
module.exports = router;
