//importing modules
const express = require('express')
const { getApk } = require('../controllers/fetchDbData')
const router = express.Router()

router.get('/apk', getApk);

module.exports = router;
