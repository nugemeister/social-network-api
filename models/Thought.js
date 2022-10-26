// import Mongoose
const {Schema, model, Types} = require('mongoose');
const reactionSchema = require('./Reaction');

// Thought Model Schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            // allow virtual model properties (properties not stored in MongoDB)
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Format date data returned
function formatDate(date) {
    return new Date (date).toLocaleString()
};

// Return a count of reactions
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

/**  Init the Thought Model */
const Thought = model('Thought', thoughtSchema);

// export
module.exports = Thought;
