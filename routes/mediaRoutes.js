const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');

router.get('/', mediaController.getAllMedia);
router.post('/', mediaController.createMedia);
router.put('/:id', mediaController.updateMedia);
router.delete('/:id', mediaController.deleteMedia);

module.exports = router;
