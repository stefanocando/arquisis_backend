const express = require('express');

const { createUsers, addMoney, getUser } = require('../controllers/users-controller');

const router = express.Router()

router.get('/user/:id', getUser);
router.post('/new', createUsers);
router.post('/addMoney', addMoney);


module.exports = router;