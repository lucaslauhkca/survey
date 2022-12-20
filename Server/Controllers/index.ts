import express from 'express';
import survey from '../Models/survey';
import User from '../Models/user';
import { UserDisplayName } from '../Util';

export function DisplayHomePage(req: express.Request, res: express.Response, next: express.NextFunction)
{
    let user = req.user as UserDocument;
    
    survey.find({}, function (err: any, surveysCollection: any)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        User.find({}, function (err: any, user: any)
        {
            if(err)
            {
                console.error(err);
                res.end(err);
            }
            res.render('index', {title: 'Home', page: 'home', surveys: surveysCollection, users:user, displayName: UserDisplayName(req) });
        });
    });
}