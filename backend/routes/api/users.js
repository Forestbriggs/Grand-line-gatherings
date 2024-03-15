const express = require('express');
const bcrypt = require('bcryptjs');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const { setTokenCookie, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

const router = express.Router();

// Middleware
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more'),
    handleValidationErrors
];

// Routes
// Sign Up
router.post('/', validateSignup, async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
    });

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
});

module.exports = router;

// fetch('/api/users', {
//     method: 'POST',
//     headers: {
//         "Content-Type": "application/json",
//         "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//     },
//     body: JSON.stringify({
//         firstName: 'Fire',
//         lastName: 'Star',
//         email: 'firestar@spider.man',
//         username: 'Firestar',
//         password: ''
//     })
// }).then(res => res.json()).then(data => console.log(data));