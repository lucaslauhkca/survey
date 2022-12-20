import mongoose from 'mongoose';
const Schema = mongoose.Schema; 

const responseSchema = new Schema
({
    surveyId: String,
    responses: [{
        qId: Number,
        answer: String
    }],
    responseDate: {
        type: Date,
        default: Date.now()
    }
},
{
    collection: "responses"
});

const Model = mongoose.model("responses", responseSchema);

export default Model;