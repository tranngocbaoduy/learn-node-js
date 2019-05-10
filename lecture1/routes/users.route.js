const express = require('express')
const router = express.Router()

const controller = require('../controllers/users.controller')
var db = require('../db')

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);
router.post('/create', controller.postCreate);

router.get('/:id', controller.get)

module.exports = router;