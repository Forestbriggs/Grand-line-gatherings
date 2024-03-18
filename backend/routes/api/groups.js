//* /backend/routes/api/groups.js
const express = require('express');

const { getAllGroups, getCurrentUserGroups } = require('../../utils/groups.js');

const router = express.Router();

//* Middleware -----------------------------------------------------------------



//* Routes ---------------------------------------------------------------------

router.get('/', getAllGroups);

router.get('/current', getCurrentUserGroups);

module.exports = router;