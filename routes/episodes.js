const express = require('express');
const router = require('express').Router();

const episodeController = require('../controllers/episodes');

const { episodeValidationRules, validate } = require('../validation/episodeValidator');

const { isAuthenticated } = require('../validation/authenticate');

router.get('/', episodeController.getAll);
router.get('/:id', episodeController.getSingle);
router.post('/', isAuthenticated, episodeValidationRules(), validate, episodeController.createEpisode);
router.put('/:id', isAuthenticated, episodeValidationRules(), validate, episodeController.updateEpisode);
router.delete('/:id', isAuthenticated, episodeController.deleteEpisode);

module.exports = router;