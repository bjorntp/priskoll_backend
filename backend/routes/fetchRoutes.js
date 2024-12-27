//importing modules
const express = require('express')
const { getApk, getPriceChangesLower, getPriceChangesRaise } = require('../controllers/fetchDbData')
const router = express.Router()

router.get('/apk', getApk);
router.get('/lowered', getPriceChangesLower)
router.get('/risen', getPriceChangesRaise)

module.exports = router;
