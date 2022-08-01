const express = require('express');
const { uploadControler } = require('../controllers');
const { uploader } = require('../helper/uploader');
const { uploadComment } = require('../controllers/commentControler');

let path = '/image';
const upload = uploader(path, 'IMG');

const router = express.Router();

router.post('/comment', commentControler.uploadFile);
router.get('/getAll', uploadControler.getAllPosts);

module.exports = router;
