const mongoose = require('mongoose');
// require ('mongoose-currency').loadType(mongoose);
// const Currency = mongoose.Types.Currency;

// Comment Model
var commentSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comment: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        }
    },
    {
        timestamps: true
    }
)

// Plate Model
var plateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        featured: {
            type: Boolean,
            default: false,
        },
        comments: [commentSchema]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Plate', plateSchema);