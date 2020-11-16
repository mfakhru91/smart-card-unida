var express = require('express')
var router = express.Router()

var rfidInputController = require('../controllers/rfidController')
const { route } = require('./permission')

router.get('/',rfidInputController.index)
router.get('/api/input/db',rfidInputController.iputRfid)
router.get('/api/get/db',rfidInputController.apiGet)
router.get('/input/rfid',rfidInputController.store)
router.get('/get/rfid',rfidInputController.apiStrore)
module.exports = router