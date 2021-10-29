const express = require('express');
const router = express.Router();
const apiController = require('../../controllers/api/dummyController');
// api routes

router.get('/', apiController.index);
module.exports = router;
