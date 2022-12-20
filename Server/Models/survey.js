"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const surveySchema = new Schema({
    title: String,
    userId: String,
    questions: [{
            qId: Number,
            qType: String,
            qText: String,
            qOption: Array,
        }],
    startDate: Date,
    endDate: Date,
    manualSet: Boolean,
    manualSetOn: Boolean,
    active: Boolean
}, {
    collection: "surveys"
});
const Model = mongoose_1.default.model("surveys", surveySchema);
exports.default = Model;
//# sourceMappingURL=survey.js.map