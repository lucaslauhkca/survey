"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayHomePage = void 0;
const survey_1 = __importDefault(require("../Models/survey"));
const user_1 = __importDefault(require("../Models/user"));
const Util_1 = require("../Util");
function DisplayHomePage(req, res, next) {
    let user = req.user;
    survey_1.default.find({}, function (err, surveysCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        user_1.default.find({}, function (err, user) {
            if (err) {
                console.error(err);
                res.end(err);
            }
            res.render('index', { title: 'Home', page: 'home', surveys: surveysCollection, users: user, displayName: (0, Util_1.UserDisplayName)(req) });
        });
    });
}
exports.DisplayHomePage = DisplayHomePage;
//# sourceMappingURL=index.js.map