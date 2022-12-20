"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessCheckingActive = exports.ProcessSurveyActive = exports.ProcessSurveyRemove = exports.ProcessSurveyUpdate = exports.DisplaySurveyUpdate = exports.ProcessSurveyAdd = exports.DisplaySurveyAdd = exports.DisplaySurveyList = void 0;
const survey_1 = __importDefault(require("../Models/survey"));
const response_1 = __importDefault(require("../Models/response"));
const Util_1 = require("../Util");
const moment_1 = __importDefault(require("moment"));
function DisplaySurveyList(req, res, next) {
    let user = req.user;
    let user_ID = user._id;
    survey_1.default.find({ userId: user_ID }, function (err, surveysCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Survey List', page: 'survey/list', surveys: surveysCollection, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplaySurveyList = DisplaySurveyList;
function DisplaySurveyAdd(req, res, next) {
    res.render('index', { title: 'Create Survey', page: 'survey/update', surveys: '', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplaySurveyAdd = DisplaySurveyAdd;
function ProcessSurveyAdd(req, res, next) {
    let user = req.user;
    let user_ID = user._id;
    let questions = [];
    let qTextItems = [];
    qTextItems = req.body.qText;
    let qTypeItems = [];
    qTypeItems = req.body.qType;
    let qOptionItems = [];
    let today = (0, moment_1.default)(Date.now()).format('YYYY-MM-DDTHH:mm');
    if (typeof (qTextItems) == "string") {
        qOptionItems = req.body.qOption0;
        questions.push({
            qId: 1,
            qType: qTypeItems,
            qText: qTextItems,
            qOption: qOptionItems
        });
    }
    else {
        if (qTextItems !== undefined) {
            for (let i = 0; i < qTextItems.length; i++) {
                if (qTextItems[i] != "") {
                    qOptionItems = req.body['qOption' + i];
                    questions.push({
                        qId: i,
                        qType: qTypeItems[i],
                        qText: qTextItems[i],
                        qOption: qOptionItems
                    });
                }
            }
        }
    }
    let newSurvey = new survey_1.default({
        "title": req.body.Title,
        "userId": user_ID,
        "questions": questions,
        "startDate": req.body.startDate,
        "endDate": req.body.endDate,
        "manualSet": false,
        "manualSetOn": false,
        "active": (today <= (0, moment_1.default)(req.body.endDate).format('YYYY-MM-DDTHH:mm') && (0, moment_1.default)(req.body.startDate).format('YYYY-MM-DDTHH:mm') <= today)
    });
    survey_1.default.create(newSurvey);
    res.redirect('/survey/list');
}
exports.ProcessSurveyAdd = ProcessSurveyAdd;
function DisplaySurveyUpdate(req, res, next) {
    let id = req.params.id;
    survey_1.default.findById(id, {}, {}, (err, surveyItem) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Update Survey', page: 'survey/update', surveys: surveyItem, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplaySurveyUpdate = DisplaySurveyUpdate;
function ProcessSurveyUpdate(req, res, next) {
    let id = req.params.id;
    let user = req.user;
    let user_ID = user._id;
    let questions = [];
    let qTextItems = [];
    qTextItems = req.body.qText;
    let qTypeItems = [];
    qTypeItems = req.body.qType;
    let qOptionItems = [];
    let today = (0, moment_1.default)(Date.now()).format('YYYY-MM-DDTHH:mm');
    if (typeof (qTextItems) == "string") {
        qOptionItems = req.body.qOption0;
        questions.push({
            qId: 1,
            qType: qTypeItems,
            qText: qTextItems,
            qOption: qOptionItems
        });
    }
    else {
        if (qTextItems !== undefined) {
            for (let i = 0; i < qTextItems.length; i++) {
                if (qTextItems[i] != "") {
                    qOptionItems = req.body['qOption' + i];
                    questions.push({
                        qId: i,
                        qType: qTypeItems[i],
                        qText: qTextItems[i],
                        qOption: qOptionItems
                    });
                }
            }
        }
    }
    let surveyItem = new survey_1.default({
        "_id": id,
        "title": req.body.Title,
        "userId": user_ID,
        "questions": questions,
        "startDate": req.body.startDate,
        "endDate": req.body.endDate,
        "manualSet": false,
        "manualSetOn": false,
        "active": (today <= (0, moment_1.default)(req.body.endDate).format('YYYY-MM-DDTHH:mm') && (0, moment_1.default)(req.body.startDate).format('YYYY-MM-DDTHH:mm') <= today)
    });
    response_1.default.deleteMany({ surveyId: id }, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
    });
    survey_1.default.updateOne({ _id: id }, surveyItem, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey/list');
    });
}
exports.ProcessSurveyUpdate = ProcessSurveyUpdate;
function ProcessSurveyRemove(req, res, next) {
    let id = req.params.id;
    survey_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey/list');
    });
}
exports.ProcessSurveyRemove = ProcessSurveyRemove;
async function ProcessSurveyActive(req, res, next) {
    let id = req.params.id;
    let surveyItem = await survey_1.default.findOne({ _id: id });
    let today = (0, moment_1.default)(Date.now()).format('YYYY-MM-DDTHH:mm');
    if (!surveyItem.manualSet) {
        survey_1.default.updateOne({ _id: id }, { manualSet: true, manualSetOn: true, active: true }, (err) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
        });
    }
    else {
        if (surveyItem.manualSetOn) {
            survey_1.default.updateOne({ _id: id }, { manualSetOn: false, active: false }, (err) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                    false;
                }
            });
        }
        else {
            survey_1.default.updateOne({ _id: id }, { manualSet: false, manualSetOn: false, active: (today <= (0, moment_1.default)(surveyItem.endDate).format('YYYY-MM-DDTHH:mm') && (0, moment_1.default)(surveyItem.startDate).format('YYYY-MM-DDTHH:mm') <= today) }, (err) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                }
            });
        }
    }
    res.redirect('/survey/list');
}
exports.ProcessSurveyActive = ProcessSurveyActive;
function ProcessCheckingActive(req, res, next) {
    survey_1.default.find(function (err, surveysCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        let today = (0, moment_1.default)(Date.now()).format('YYYY-MM-DDTHH:mm');
        for (let i = 0; i < surveysCollection.length; i++) {
            if (!surveysCollection[i].manualSet) {
                if (today <= (0, moment_1.default)(surveysCollection[i].endDate).format('YYYY-MM-DDTHH:mm') && (0, moment_1.default)(surveysCollection[i].startDate).format('YYYY-MM-DDTHH:mm') <= today) {
                    survey_1.default.updateOne({ _id: surveysCollection[i]._id }, { active: true }, (err) => {
                        if (err) {
                            console.error(err);
                            res.end(err);
                        }
                    });
                }
                else {
                    survey_1.default.updateOne({ _id: surveysCollection[i]._id }, { active: false }, (err) => {
                        if (err) {
                            console.error(err);
                            res.end(err);
                        }
                    });
                }
            }
        }
        next();
    });
}
exports.ProcessCheckingActive = ProcessCheckingActive;
//# sourceMappingURL=survey-list.js.map