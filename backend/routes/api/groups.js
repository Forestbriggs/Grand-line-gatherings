//* /backend/routes/api/groups.js
const express = require('express');

const { getAllGroups, getCurrentUserGroups, getGroupById } = require('../../utils/groups.js');
const { requireAuth } = require('../../utils/auth.js');

const router = express.Router();

//* Middleware -----------------------------------------------------------------



//* Routes ---------------------------------------------------------------------

router.get('/', getAllGroups);

router.get('/current', requireAuth, getCurrentUserGroups);

router.get('/:groupId', getGroupById)

module.exports = router;