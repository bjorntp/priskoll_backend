//importing modules
const express = require('express')
const updateBeers = require('../jobs/updateBeers')
const { getWhite, getRed, getRestWine } = require('../jobs/updateWines')
const updateSpirits = require('../jobs/updateSpirits')
const readDataFromJSON = require('../jobs/readFile')

const router = express.Router()

router.post('/beer', updateBeers)
router.post('/white', getWhite)
router.post('/red', getRed)
router.post('/rest', getRestWine)
router.post('/spirit', updateSpirits);
router.post('/old', readDataFromJSON);

module.exports = router
