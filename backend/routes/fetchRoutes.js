//importing modules
const express = require('express')
const { getApk, getPriceChangesLower, getPriceChangesRaise, getDates } = require('../controllers/fetchDbData')
const router = express.Router()

router.get('/apk', getApk);
router.get('/lowered', getPriceChangesLower)
router.get('/raised', getPriceChangesRaise)
router.get('/dates', getDates)

module.exports = router;
