const express = require('express');
const router = require('express').Router();

const characterController = require('../controllers/characters');
const { characterValidationRules, validate } = require('../validation/characterValidator');
const { isAuthenticated } = require('../validation/authenticate');

router.get('/', characterController.getAll);
router.get('/:id', characterController.getSingle);
router.post('/', isAuthenticated, characterValidationRules(), validate, characterController.createCharacter);
router.put('/:id', isAuthenticated, characterValidationRules(), validate, characterController.updateCharacter);
router.delete('/:id', isAuthenticated, characterController.deleteCharacter);

module.exports = router;