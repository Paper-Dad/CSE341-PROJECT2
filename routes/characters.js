const express = require('express');
const router = require('express').Router();

const characterController = require('../controllers/characters');
const { characterValidationRules, validate } = require('../validation/characterValidator');


router.get('/', characterController.getAll);
router.get('/:id', characterController.getSingle);
router.post('/', characterValidationRules(), validate, characterController.createCharacter);
router.put('/:id', characterValidationRules(), validate, characterController.updateCharacter);
router.delete('/:id', characterController.deleteCharacter);

module.exports = router;