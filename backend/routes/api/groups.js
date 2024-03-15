//* /backend/routes/api/groups.js
const express = require('express');

const { getAllGroups } = require('../../utils/groups.js');

const router = express.Router();

router.get('/', getAllGroups)

module.exports = router;