const express = require('express');
const router = express.Router();

const bookingController = require('../../controllers/api/BookingController');

router.post('/', bookingController.bookSeats);
module.exports = router;
