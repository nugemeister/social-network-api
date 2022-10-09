// import Mongoose
const {Schema, model} = require('mongoose');

// User Model Schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.])$/, 'Please enter a valid email address.',],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ]
    },
    {
        toJSON: {
            // allow virtual model properties (properties not stored in MongoDB)
            virtuals: true,
        },
        id: false,
    }
);

// Friend Count Section
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Init the User Model
const User = model('User', userSchema);

// export
module.exports = User;