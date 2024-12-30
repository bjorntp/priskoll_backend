//importing modules
const express = require('express')
const updateBeers = require('../jobs/updateBeers')
const updateWines = require('../jobs/updateWines')
const updateSpirits = require('../jobs/updateSpirits')
const readDataFromJSON = require('../jobs/readFile')

const router = express.Router()

router.post('/beer', updateBeers)
router.post('/wine', updateWines)
router.post('/spirit', updateSpirits);
router.post('/old', readDataFromJSON);

module.exports = router
