"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessResponseAdd = exports.DisplayResponseAdd = exports.ProcessCSV = exports.DisplayStat = void 0;
const survey_1 = __importDefault(require("../Models/survey"));
const response_1 = __importDefault(require("../Models/response"));
const Util_1 = require("../Util");
async function DisplayStat(req, res, next) {
    let id = req.params.id;
    let rId = req.params.surveyId;
    survey_1.default.findById(id, {}, {}, (err, surveyItem) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            response_1.default.find({ surveyId: id }, function (err, responseItem) {
                if (err) {
                    console.error(err);
                    res.end(err);
                }
                res.render('index', { title: 'Response Statistic', page: 'stat/viewstat', surveys: surveyItem, responses: responseItem, displayName: (0, Util_1.UserDisplayName)(req) });
            });
        }
    });
}
exports.DisplayStat = DisplayStat;
async function ProcessCSV(req, res, next) {
    let id = req.params.id;
    let data = {
        SurveyTitle: String,
        Questions: [String],
        Answer: [[String]]
    };
    survey_1.default.findById(id, {}, {}, (err, surveyItem) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            data.SurveyTitle = surveyItem.title;
            data.Questions = [];
            for (let i = 0; i < surveyItem.questions.length; i++) {
                data.Questions.push(surveyItem.questions[i].qText);
            }
            response_1.default.find({ surveyId: id }, function (err, responseItem) {
                if (err) {
                    console.error(err);
                    res.end(err);
                }
                else {
                    let answer = [[String]];
                    answer = [];
                    for (let ii = 0; ii < responseItem.length; ii++) {
                        answer.push([]);
                        for (let iii = 0; iii < responseItem[ii].responses.length; iii++) {
                            answer[ii].push(responseItem[ii].responses[iii].answer);
                        }
                    }
                    data.Answer = [];
                    let aaLength = answer[0].length;
                    for (let ii = 0; ii < aaLength; ii++) {
                        data.Answer.push([]);
                    }
                    for (let ii = 0; ii < answer.length; ii++) {
                        for (let iii = 0; iii < aaLength; iii++) {
                            data.Answer[iii].push(answer[ii][iii]);
                        }
                    }
                    res.send(data);
                }
            });
        }
    });
}
exports.ProcessCSV = ProcessCSV;
function DisplayResponseAdd(req, res, next) {
    let id = req.params.surveyId;
    survey_1.default.findById(id, {}, {}, (err, surveyItem) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        if (surveyItem.active) {
            res.render('index', { title: 'Response Survey', page: 'survey/response', surveys: surveyItem, response: '', displayName: (0, Util_1.UserDisplayName)(req) });
        }
    });
}
exports.DisplayResponseAdd = DisplayResponseAdd;
function ProcessResponseAdd(req, res, next) {
    let id = req.params.surveyId;
    let qList = req.body.question;
    let responseList = [];
    let responseItem;
    if (req.body.question == null) {
        console.log("Can't be empty");
    }
    else {
        let qListLength = qList.length;
        if (qListLength == 0) {
            qListLength = 1;
        }
        for (let i = 0; i < qListLength; i++) {
            responseItem = req.body['response' + i];
            responseList.push({
                qId: (i + 1),
                answer: responseItem
            });
        }
        let newResponse = new response_1.default({
            "surveyId": id,
            "responses": responseList,
        });
        response_1.default.create(newResponse);
        res.redirect('/home');
    }
}
exports.ProcessResponseAdd = ProcessResponseAdd;
function v(v) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=response.js.map