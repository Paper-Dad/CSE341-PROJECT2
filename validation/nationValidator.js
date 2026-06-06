const { body, validationResult } = require('express-validator');

const nationValidationRules = () => {
    return [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Name is required.'),

        body('capital')
            .trim()
            .notEmpty()
            .withMessage('Capital is required.'),

        body('government')
            .trim()
            .notEmpty()
            .withMessage('Government is required.'),

        body('culture')
            .trim()
            .notEmpty()
            .withMessage('Culture is required.'),

        body('notableCharacters')
            .isArray({ min: 1 })
            .withMessage('Notable characters must be an array with at least one character.'),

        body('notableCharacters.*')
            .trim()
            .notEmpty()
            .withMessage('Each notable character must be a non-empty string.'),

        body('description')
            .trim()
            .notEmpty()
            .isLength({ min: 10 })
            .withMessage('Description is required.')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { nationValidationRules, validate };