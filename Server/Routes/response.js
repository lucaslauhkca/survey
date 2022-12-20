"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Util_1 = require("../Util");
const response_1 = require("../Controllers/response");
router.get('/stat/viewstat/:id', Util_1.AuthGuard, response_1.DisplayStat);
router.get('/stat/viewstat/csv/:id', Util_1.AuthGuard, response_1.ProcessCSV);
router.get('/survey/response/add/:surveyId', response_1.DisplayResponseAdd);
router.post('/survey/response/add/:surveyId', response_1.ProcessResponseAdd);
exports.default = router;
//# sourceMappingURL=response.js.map