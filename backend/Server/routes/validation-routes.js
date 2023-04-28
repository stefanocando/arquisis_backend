const express = require('express');

const validationsController = require('../controllers/validations-controller')

const router = express.Router()

router.post('/', validationsController.updateRequest);

module.exports = router