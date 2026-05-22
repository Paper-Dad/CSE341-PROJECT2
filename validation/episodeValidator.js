const { body, validationResult } = require('express-validator');

const episodeValidationRules = () => {
    return [
        body('title')
            .trim()
            .notEmpty()
            .withMessage('Title is required.'),
        
        body('book')
            .trim()
            .notEmpty()
            .withMessage('Book is required.'),
        
        body('episode')
            .notEmpty()
            .withMessage('Episode number is required.')
            .isInt({ min: 1 })
            .withMessage('Episode number must be a positive number.'),
        
        body('description')
            .trim()
            .notEmpty()
            .withMessage('Description is required.')
            .isLength({ min: 10 })
            .withMessage('Description must be at least 10 characters long.')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { episodeValidationRules, validate };