//* /backend/routes/api/groups.js
const express = require('express');

const { getAllGroups, getCurrentUserGroups, getGroupById, createGroup, addGroupImage, editGroupById, deleteGroupById } = require('../../utils/groups.js');
const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//* Middleware -----------------------------------------------------------------
const validateBody = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 60 })
        .withMessage('Name must be 60 characters or less'),
    check('about')
        .exists({ checkFalsy: true })
        .isLength({ min: 50 })
        .withMessage('About must be 50 characters or more'),
    check('type')
        .exists({ checkFalsy: true })
        .isIn(['Online', 'In person'])
        .withMessage("Type must be 'online' or 'In person'"),
    check('private')
        .exists({ checkFalsy: true })
        .isBoolean()
        .withMessage("Private must be a boolean"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 2, max: 2 })
        .withMessage('State is required'),
    handleValidationErrors
];

//* Routes ---------------------------------------------------------------------

router.get('/current', requireAuth, getCurrentUserGroups);

router.post('/:groupId/images', requireAuth, addGroupImage);

router.put('/:groupId', requireAuth, validateBody, editGroupById);

router.get('/:groupId', getGroupById);

router.delete('/:groupId', requireAuth, deleteGroupById);

router.post('/', requireAuth, validateBody, createGroup);

router.get('/', getAllGroups);

module.exports = router;