import express from 'express';
import survey from '../Models/survey';
import response from '../Models/response';

import { UserDisplayName } from '../Util';
import moment from 'moment';

export function DisplaySurveyList(req: express.Request, res: express.Response, next: express.NextFunction)
{
    let user = req.user as UserDocument;
    let user_ID = user._id;
    
    survey.find({ userId: user_ID }, function (err: any, surveysCollection: any)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        res.render('index', {title: 'Survey List', page: 'survey/list', surveys: surveysCollection, displayName: UserDisplayName(req) });
    });
}

export function DisplaySurveyAdd (req: express.Request, res: express.Response, next: express.NextFunction)
{
    res.render('index', { title: 'Create Survey', page: 'survey/update', surveys: '', displayName: UserDisplayName(req)  });
}

export function ProcessSurveyAdd(req: express.Request, res: express.Response, next: express.NextFunction) {
    let user = req.user as UserDocument;
    let user_ID = user._id;
    let questions = [];
    let qTextItems = [];
    qTextItems = req.body.qText;
    let qTypeItems = [];
    qTypeItems = req.body.qType;
    let qOptionItems = [];
    let today = moment(Date.now()).format('YYYY-MM-DDTHH:mm');
    
    if ( typeof (qTextItems) == "string") {
        qOptionItems = req.body.qOption0;
        questions.push({
            qId: 1,
            qType: qTypeItems,
            qText: qTextItems,
            qOption: qOptionItems
        });
    } else {
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
    
    let newSurvey = new survey
    ({
        "title": req.body.Title,
        "userId": user_ID,
        "questions": questions,
        "startDate": req.body.startDate,
        "endDate": req.body.endDate,
        "manualSet": false,
        "manualSetOn": false,
        "active" : (today <= moment(req.body.endDate).format('YYYY-MM-DDTHH:mm') && moment(req.body.startDate).format('YYYY-MM-DDTHH:mm') <= today)
    })
    
    //console.log(newSurvey.active);
    //console.log(newSurvey);
    survey.create(newSurvey);
    res.redirect('/survey/list');
}

export function DisplaySurveyUpdate(req: express.Request, res: express.Response, next: express.NextFunction)
{
    let id = req.params.id;

    survey.findById(id, {}, {}, (err, surveyItem) => 
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Update Survey', page: 'survey/update', surveys: surveyItem, displayName: UserDisplayName(req) });
    });
}

export function ProcessSurveyUpdate(req: express.Request, res: express.Response, next: express.NextFunction)
{
    let id = req.params.id;
    let user = req.user as UserDocument;
    let user_ID = user._id;
    let questions = [];
    let qTextItems = [];
    qTextItems = req.body.qText;
    let qTypeItems = [];
    qTypeItems = req.body.qType;
    let qOptionItems = [];
    let today = moment(Date.now()).format('YYYY-MM-DDTHH:mm');

    if ( typeof (qTextItems) == "string") {
        qOptionItems = req.body.qOption0;
        questions.push({
            qId: 1,
            qType: qTypeItems,
            qText: qTextItems,
            qOption: qOptionItems
        });
    } else {
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

    let surveyItem = new survey
    ({
        "_id": id,
        "title": req.body.Title,
        "userId": user_ID,
        "questions": questions,
        "startDate": req.body.startDate,
        "endDate": req.body.endDate,
        "manualSet": false,
        "manualSetOn": false,
        "active" : (today <= moment(req.body.endDate).format('YYYY-MM-DDTHH:mm') && moment(req.body.startDate).format('YYYY-MM-DDTHH:mm') <= today)
    })
    //remove responses
    response.deleteMany({surveyId: id}, function(err)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
    });
    //console.log(surveyItem.active);
    survey.updateOne({ _id: id }, surveyItem, {}, (err) => {       
        if(err)
        {
            console.error(err);
            res.end(err);
        }
    
        res.redirect('/survey/list');
    });
}

export function ProcessSurveyRemove(req: express.Request, res: express.Response, next: express.NextFunction)
{
    let id = req.params.id;
    
    survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey/list');
    });
}

export async function ProcessSurveyActive(req: express.Request, res: express.Response, next: express.NextFunction)
{
    let id = req.params.id;
    let surveyItem = await survey.findOne({ _id: id });
    let today = moment(Date.now()).format('YYYY-MM-DDTHH:mm');
    if (!surveyItem.manualSet) {
        survey.updateOne({ _id: id }, { manualSet: true, manualSetOn: true, active: true }, (err: any) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
        });
    } else {
        if(surveyItem.manualSetOn) {
            survey.updateOne({ _id: id }, { manualSetOn: false, active: false }, (err: any) => {
            if (err) {
                console.error(err);
                res.end(err);false
            }
        });
        } else {
            survey.updateOne({ _id: id }, { manualSet: false, manualSetOn: false, active: (today <= moment(surveyItem.endDate).format('YYYY-MM-DDTHH:mm') && moment(surveyItem.startDate).format('YYYY-MM-DDTHH:mm') <= today) }, (err: any) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                }
            }); 
        }
    }
    res.redirect('/survey/list');
}

export function ProcessCheckingActive(req : express.Request, res: express.Response, next: express.NextFunction)
{
    survey.find(function(err, surveysCollection)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        let today = moment(Date.now()).format('YYYY-MM-DDTHH:mm');
        
        for (let i = 0; i < surveysCollection.length; i++){
            if(!surveysCollection[i].manualSet)
            {
                if(today <= moment(surveysCollection[i].endDate).format('YYYY-MM-DDTHH:mm') && moment(surveysCollection[i].startDate).format('YYYY-MM-DDTHH:mm') <= today)
                {
                    survey.updateOne({ _id: surveysCollection[i]._id }, { active: true }, (err: any) =>
                    {
                        if (err) 
                        {
                            console.error(err);
                            res.end(err);
                        } 
                    });
                }
                else
                {
                    survey.updateOne({ _id: surveysCollection[i]._id }, { active: false }, (err: any) =>
                    {
                        if (err) 
                        {
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