const express = require('express');

const { createUsers, addMoney } = require('../controllers/users-controller');

const router = express.Router()

router.post('/new', createUsers);
router.post('/addMoney', addMoney);

module.exports = router;