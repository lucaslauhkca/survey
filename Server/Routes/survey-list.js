"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Util_1 = require("../Util");
const survey_list_1 = require("../Controllers/survey-list");
router.get('/survey/list', Util_1.AuthGuard, survey_list_1.ProcessCheckingActive, survey_list_1.DisplaySurveyList);
router.get('/survey/update/:id', Util_1.AuthGuard, survey_list_1.DisplaySurveyUpdate);
router.get('/survey/add', Util_1.AuthGuard, survey_list_1.DisplaySurveyAdd);
router.post('/survey/add', Util_1.AuthGuard, survey_list_1.ProcessSurveyAdd);
router.post('/survey/update/:id', Util_1.AuthGuard, survey_list_1.ProcessSurveyUpdate);
router.get('/survey/remove/:id', Util_1.AuthGuard, survey_list_1.ProcessSurveyRemove);
router.get('/survey/changeactive/:id', Util_1.AuthGuard, survey_list_1.ProcessSurveyActive);
exports.default = router;
//# sourceMappingURL=survey-list.js.map