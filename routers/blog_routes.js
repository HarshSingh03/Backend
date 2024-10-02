const express = require('express')
const router = express.Router()
const temp = require('../controllers/Blog')
router.route('/').get()