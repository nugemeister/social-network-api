const {Schema, model, Types} = require('mongoose');

// Reaction Model Schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        },
    },
    {
        toJSON: {
            // allow virtual model properties (properties not stored in MongoDB)
            virtuals: true,
        },
        id: false,
        _id: false,
    }
);

// Format date data returned
function formatDate(date) {
    return date.toLocalString();
};

// Init the Reaction Model
const Reaction = model('Reaction', reactionSchema);

// export
module.exports = Reaction;
