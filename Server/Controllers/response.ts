import express from 'express';
import survey from '../Models/survey';
import response from '../Models/response';
import fs from 'fs';
import path from 'path';
import { UserDisplayName } from '../Util';

export async function DisplayStat(req: express.Request, res: express.Response, next: express.NextFunction)
{
    let id = req.params.id;
    let rId = req.params.surveyId;
    survey.findById(id, {}, {}, (err, surveyItem) => 
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else 
        {
            response.find({surveyId : id}, function (err: any, responseItem: any)
            {
                if (err)
                {
                    console.error(err);
                    res.end(err);
                }
                res.render('index', { title: 'Response Statistic', page: 'stat/viewstat', surveys: surveyItem, responses: responseItem, displayName: UserDisplayName(req) });
            });
        }
    });
}

export async function ProcessCSV(req: express.Request, res: express.Response, next: express.NextFunction)
{
    let id = req.params.id;
    let data = {
        SurveyTitle: String,
        Questions: [String],
        Answer: [[String]]
    };
             
    survey.findById(id, {}, {}, (err, surveyItem) => 
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            data.SurveyTitle = surveyItem.title;
            data.Questions = [];
            for (let i = 0; i < surveyItem.questions.length; i++){
                data.Questions.push(surveyItem.questions[i].qText);
            }
        
            response.find({surveyId : id}, function (err: any, responseItem: any)
            {
                if (err) {
                    console.error(err);
                    res.end(err);
                }
                else {
                    let answer = [[String]];
                    answer = [];
                    for (let ii = 0; ii < responseItem.length; ii++){
                        answer.push([]);
                        for (let iii = 0; iii < responseItem[ii].responses.length; iii++) {
                            answer[ii].push(responseItem[ii].responses[iii].answer);
                        }
                    }
                    data.Answer = [];
                    let aaLength = answer[0].length;
                    for (let ii = 0; ii < aaLength; ii++) {
                        data.Answer.push([])
                    }
                    for (let ii = 0; ii < answer.length; ii++){
                        for (let iii = 0; iii < aaLength; iii++) {
                            data.Answer[iii].push(answer[ii][iii]);
                        }
                    }
                    res.send(data)
                    //console.log(typeof (csv));
                    //console.log(csv);
                  
                    /*let csvmaker = function (data: any ) {
                        let csvR = [];
                        csvR.push(data.SurveyTitle);
                        let value = [];
                        for (let ii = 0; ii < data.Questions.length; ii++){ 
                            value.push('Question '+ (ii+1) + ': ' + data.Questions[ii]);
                            value.push(data.Answer[ii] + '\n');
                            value.join(',');
                        }
                        csvR.push(value.join('\n'));
                        return csvR.join('\n\n')
                    }
                
                    let csvdata = csvmaker(csv);
                    let filePath = path.join(__dirname, '../..', 'Client', 'data', 'report.csv')
                    fs.writeFile(filePath, csvdata, function (err)
                    {
                        if (err) {
                            console.error(err);
                            res.end(err);
                        }
                        res.download(filePath, 'report.csv');
                    });*/
                }
            });
        }
    });
}

export function DisplayResponseAdd(req: express.Request, res: express.Response, next: express.NextFunction)
{
    let id = req.params.surveyId;
    
    survey.findById(id, {}, {}, (err, surveyItem) => 
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        if (surveyItem.active) {
            res.render('index', { title: 'Response Survey', page: 'survey/response', surveys: surveyItem, response: '', displayName: UserDisplayName(req) });
        } 
    });
}

export function ProcessResponseAdd(req: express.Request, res: express.Response, next: express.NextFunction)
{
    let id = req.params.surveyId;
    let qList = req.body.question;
    let responseList: any[] = [];
    let responseItem;
    if (req.body.question==null){
        console.log("Can't be empty")
    }
    else {
        let qListLength = qList.length;
        if (qListLength == 0)
        {
            qListLength = 1;
        }
        //console.log(qListLength);
        for (let i = 0; i < qListLength; i++) {
            responseItem = req.body['response' + i];
            //console.log(responseItem);
            responseList.push({
                qId: (i+1),
                answer: responseItem
            });
        }
    
        let newResponse = new response
        ({
            "surveyId": id,
            "responses": responseList,
        });
        //console.log(newResponse);
        response.create(newResponse);
        res.redirect('/home');
    }
}

function v(v: any) {
    throw new Error('Function not implemented.');
}