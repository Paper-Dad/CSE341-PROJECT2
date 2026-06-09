const express = require('express');
const router = require('express').Router();

const userController = require('../controllers/users');
const { userValidationRules, validate } = require('../validation/userValidator');
const { isAuthenticated } = require('../validation/authenticate');

router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);
router.post('/', isAuthenticated, userValidationRules(), validate, userController.createUser);
router.put('/:id', isAuthenticated, userValidationRules(), validate, userController.updateUser);
router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;