// backend/routes/api/index.js
const router = require('express').Router();

const { restoreUser } = require('../../utils/auth.js');

// Connect restoreUser middleware to the API router
// If current user is valid, set req.user to the user in the db
// If current user session is not valid, set req.user to null
router.use(restoreUser);

module.exports = router;