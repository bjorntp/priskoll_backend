//importing modules
import express from 'express'
import { getBeers } from '../jobs/updateBeers'
import { getWhite, getRed, getRestWine } from '../jobs/updateWines'
import { getSpirits } from '../jobs/updateSpirits'
import { readDataFromJSON } from '../jobs/readFile'

const router = express.Router()

router.post('/beer', getBeers)
router.post('/white', getWhite)
router.post('/red', getRed)
router.post('/rest', getRestWine)
router.post('/spirit', getSpirits);
router.post('/old', readDataFromJSON);

export default router;
