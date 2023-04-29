const express = require('express');
const jwks = require('jwks-rsa');
const { expressjwt: jwt } = require('express-jwt');

const requestController = require('../controllers/request-controller')

const router = express.Router()

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-m7bbya2l02k3sm35.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'this is a unique identifier',
  issuer: 'https://dev-m7bbya2l02k3sm35.us.auth0.com/',
  algorithms: ['RS256']
});

router.post('/', requestController.saveRequest);

router.get('/all', requestController.getAllRequest);

router.post('/new', jwtCheck, requestController.createRequest);

router.get('/user', jwtCheck, requestController.getUserRequests);

module.exports = router