const express = require('express');
const router = require('express').Router();

const episodeController = require('../controllers/episodes');

const { episodeValidationRules, validate } = require('../validation/episodeValidator');

router.get('/', episodeController.getAll);
router.get('/:id', episodeController.getSingle);
router.post('/', episodeValidationRules(), validate, episodeController.createEpisode);
router.put('/:id', episodeValidationRules(), validate, episodeController.updateEpisode);
router.delete('/:id', episodeController.deleteEpisode);

module.exports = router;