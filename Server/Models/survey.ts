import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const surveySchema = new Schema
({
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
},
{
    collection: "surveys"
});

const Model = mongoose.model("surveys", surveySchema);

export default Model;