const express = require('express');

const requestController = require('../controllers/request-controller')

const router = express.Router()

router.post('/', requestController.createRequest);

module.exports = router