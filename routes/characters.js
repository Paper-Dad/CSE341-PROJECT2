const express = require('express');
const router = require('express').Router();

const characterController = require('../controllers/characters');

router.get('/', characterController.getAll);
router.get('/:id', characterController.getSingle);
router.post('/', characterController.createCharacter);
router.put('/:id', characterController.updateCharacter);
router.delete('/:id', characterController.deleteCharacter);

module.exports = router;