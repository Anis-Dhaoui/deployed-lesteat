const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guestFeedbackSchema = new Schema({
    guestAuthor:{
        firstname:{
            type: String,
            required: true
        },
        lastname:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        phone:{
            type: String,
            required: true
        }
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

const GuestFeedback = mongoose.model('GuestFeedback', guestFeedbackSchema, 'feedbacks' );

module.exports = GuestFeedback;