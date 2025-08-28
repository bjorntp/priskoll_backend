//importing modules
import express from 'express';
import { getApk, getPriceChangesLower, getPriceChangesRaise, getDates } from '../controllers/fetchDbData';
const router = express.Router()

router.get('/apk', getApk);
router.get('/lowered', getPriceChangesLower)
router.get('/raised', getPriceChangesRaise)
router.get('/dates', getDates)

export default router;
