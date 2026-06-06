const express = require('express');
const router = require('express').Router();

const nationController = require('../controllers/nations');
const { nationValidationRules, validate } = require('../validation/nationValidator');
const { isAuthenticated } = require('../validation/authenticate');

router.get('/', nationController.getAll);
router.get('/:id', nationController.getSingle);
router.post('/', isAuthenticated, nationValidationRules(), validate, nationController.createNation);
router.put('/:id', isAuthenticated, nationValidationRules(), validate, nationController.updateNation);
router.delete('/:id', isAuthenticated, nationController.deleteNation);

module.exports = router;