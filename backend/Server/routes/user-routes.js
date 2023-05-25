const express = require('express');

const router = express.Router()

router.post('/new', createUsers)

module.exports = router;