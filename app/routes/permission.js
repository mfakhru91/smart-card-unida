var express = require('express')
var router = express.Router()

var permissionController =  require("../controllers/permissionController")

router.get('/perizinan/keluar',permissionController.keluar)
router.get('/perizinan/masuk',permissionController.masuk)
router.get('/perizinan',permissionController.izin)
router.get('/dataKeluar',permissionController.getData)

module.exports = router

