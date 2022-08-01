const express = require('express');
const { uploadControler } = require('../controllers');
const { uploader } = require('../helper/uploader');
const { uploadFile } = require('../controllers/uploaderControler');

let path = '/image';
const upload = uploader(path, 'IMG');

const router = express.Router();

router.post('/upload', uploadControler.uploadFile);
router.get('/getAll', uploadControler.getAllPosts);

module.exports = router;
