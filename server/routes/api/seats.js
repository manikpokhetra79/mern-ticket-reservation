const express = require('express');
const router = express.Router();

const bookingController = require('../../controllers/api/BookingController');

router.post('/bookseats', bookingController.bookSeats);
router.delete('/deleteall', bookingController.deleteAll);
module.exports = router;
