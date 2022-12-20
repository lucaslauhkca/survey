"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const index_1 = require("../Controllers/index");
const survey_list_1 = require("../Controllers/survey-list");
router.get('/', survey_list_1.ProcessCheckingActive, index_1.DisplayHomePage);
router.get('/home', survey_list_1.ProcessCheckingActive, index_1.DisplayHomePage);
exports.default = router;
//# sourceMappingURL=index.js.map