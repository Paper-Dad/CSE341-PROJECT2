const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
    return [
        body('username')
            .trim()
            .notEmpty()
            .withMessage('Username is required.'),

        body('firstName')
            .trim()
            .notEmpty()
            .withMessage('First name is required.'),

        body('lastName')
            .trim()
            .notEmpty()
            .withMessage('Last name is required.'),

        body('role')
            .trim()
            .notEmpty()
            .withMessage('Role is required.')
            .isIn(['admin', 'user'])
            .withMessage('Role must be either admin or user.'),

        body('favoriteCharacter')
            .trim()
            .notEmpty()
            .withMessage('Favorite character is required.')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    next();
};

module.exports = {
    userValidationRules,
    validate
};