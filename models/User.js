const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => new Date(timestamp).toLocaleDateString(),
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
)

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] //check
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);
userSchema
    .virtual('friendCount')
        .get(function() {
            return this.friends.length;
        });

const User = model('user', userSchema);
module.exports = User;