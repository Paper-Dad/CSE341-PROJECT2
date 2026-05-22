const { body, validationResult } = require('express-validator');

const characterValidationRules = () => {
    return [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Name is required.'),

        body('nation')
            .trim()
            .notEmpty()
            .withMessage('Nation is required.'),

        body('bendingType')
            .trim()
            .notEmpty()
            .withMessage('Bending type is required.'),

        body('role')
            .trim()
            .notEmpty()
            .withMessage('Role is required.'),

        body('age')
            .notEmpty()
            .withMessage('Age is required.')
            .isInt({ min: 1 })
            .withMessage('Age must be a positive number.'),

        body('firstAppearance')
            .trim()
            .notEmpty()
            .withMessage('First appearance is required.'),

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

    if (errors.isEmpty()) {
        return next();
    }

    return res.status(400).json({
        errors: errors.array()
    });
};

module.exports = {
    characterValidationRules,
    validate
};