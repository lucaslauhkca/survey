import express from 'express';
const router = express.Router();

import { AuthGuard } from '../Util';

import { DisplaySurveyList, DisplaySurveyUpdate, DisplaySurveyAdd, ProcessSurveyAdd, ProcessSurveyRemove, ProcessSurveyUpdate,ProcessSurveyActive, ProcessCheckingActive } from '../Controllers/survey-list';

router.get('/survey/list', AuthGuard, ProcessCheckingActive, DisplaySurveyList);
router.get('/survey/update/:id', AuthGuard, DisplaySurveyUpdate);
router.get('/survey/add', AuthGuard, DisplaySurveyAdd);
router.post('/survey/add', AuthGuard, ProcessSurveyAdd);
router.post('/survey/update/:id', AuthGuard, ProcessSurveyUpdate);
router.get('/survey/remove/:id', AuthGuard, ProcessSurveyRemove);
router.get('/survey/changeactive/:id', AuthGuard, ProcessSurveyActive);

export default router;