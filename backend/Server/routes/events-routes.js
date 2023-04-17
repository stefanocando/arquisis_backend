const express = require('express');

const eventsController = require('../controllers/events-controller')

const router = express.Router()

router.get('/', eventsController.getEvents)

router.post('/', eventsController.createEvents)

module.exports = router