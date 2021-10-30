const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
// api routes
router.use('/api', require('./api'));
router.get('/', homeController.home);
module.exports = router;
