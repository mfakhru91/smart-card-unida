var express = require('express')
var router = express.Router()

var rfidInputController = require('../controllers/rfidController')

router.get('/api/input',rfidInputController.putRfid)
// router.get('/input/data',rfidInputController.getViewRfid)
// router.get('/api/pushrfid',rfidInputController.pushRfid)
module.exports = router