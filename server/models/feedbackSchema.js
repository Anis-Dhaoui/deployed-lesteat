const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    feedback:{
        type: String,
        required: true,
    }
},
{
    timestamps: true,
    // $pushAll operator is no longer supported in Mongo 3.6.x+, and to fix this issue we add this entry
    usePushEach: true
}
);

const Feedbacks = mongoose.model('LoggedFeedback', feedbackSchema, 'feedbacks');

module.exports = Feedbacks;