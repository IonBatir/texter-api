const {model, Schema} = require('mongoose');
const bcrypt = require('bcryptjs');

const {EMAIL_REGEX, ERROR} = require('../constants');
const {SALT_LENGTH} = require('../secrets');
const {generateErrorCode} = require('../utils');

const schema = new Schema({
    email: {
        type: String,
        required: [true, generateErrorCode('email', ERROR.REQUIRED)],
        validate: [EMAIL_REGEX, generateErrorCode('email', ERROR.NOT_VALID)],
        unique: true,
        lowercase: true,
        trim: true,
    },
    username: {
        type: String,
        required: [true, generateErrorCode('username', ERROR.REQUIRED)],
        minlength: [3, generateErrorCode('username', ERROR.MIN_LENGTH, 3)],
        maxlength: [12, generateErrorCode('username', ERROR.MAX_LENGTH, 12)],
        trim: true,
    },
    password: {
        type: String,
        required: [true, generateErrorCode('password', ERROR.REQUIRED)],
        minlength: [8, generateErrorCode('password', ERROR.MIN_LENGTH, 8)],
        trim: true,
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    },
    lastAccess: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        trim: true,
    }
}, {timestamps: true});

schema.pre('save', async function (next) {
    try {
        if (this.isModified('password'))
            this.password = await bcrypt.hash(this.password, SALT_LENGTH);
        next();
    } catch (error) {
        next(error);
    }
});

schema.methods.isPasswordCorrect = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = model('User', schema);