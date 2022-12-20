"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const responseSchema = new Schema({
    surveyId: String,
    responses: [{
            qId: Number,
            answer: String
        }],
    responseDate: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: "responses"
});
const Model = mongoose_1.default.model("responses", responseSchema);
exports.default = Model;
//# sourceMappingURL=response.js.map