const express = require('express');
const router = require('express').Router();

const episodeController = require('../controllers/episodes');

router.get('/', episodeController.getAll);
router.get('/:id', episodeController.getSingle);
router.post('/', episodeController.createEpisode);
router.put('/:id', episodeController.updateEpisode);
router.delete('/:id', episodeController.deleteEpisode);

module.exports = router;