const express = require('express');

const requestController = require('../controllers/request-controller')

const router = express.Router()

router.post('/', requestController.saveRequest);

router.get('/all', requestController.getAllRequest);

router.post('/new', requestController.createRequest);


module.exports = router