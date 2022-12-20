import express from 'express';
const router = express.Router();

import { AuthGuard } from '../Util';

import { DisplayStat, DisplayResponseAdd, ProcessResponseAdd, ProcessCSV } from '../Controllers/response';

router.get('/stat/viewstat/:id', AuthGuard, DisplayStat);
router.get('/stat/viewstat/csv/:id', AuthGuard, ProcessCSV);
router.get('/survey/response/add/:surveyId', DisplayResponseAdd);
router.post('/survey/response/add/:surveyId', ProcessResponseAdd);

export default router;
