const {model, Schema} = require('mongoose');
const bcrypt = require('bcryptjs');

const {EMAIL_REGEX} = require('../constants');
const {SALT_LENGTH} = require('../secrets');

const schema = new Schema({
    email: {
        type: String,
        required: [true, 'EmailRequired'],
        validate: [EMAIL_REGEX, 'EmailNotValid'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'UsernameRequired'],
        minlength: [3, 'UsernameMinLength3'],
        maxlength: [12, 'UsernameMaxLength12'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'PasswordRequired'],
        minlength: [8, 'PasswordMinLength8'],
        trim: true,
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

schema.pre('save', async (next) => {
    try {
        if (this.isModified('password'))
            this.password = await bcrypt.hash(this.password, SALT_LENGTH);
        next();
    } catch (error) {
        next(error);
    }
});

schema.statics.isEmailUsed = async function (email) {
    const user = await this.findOne({email});
    return !!user;
};

schema.methods.isPasswordCorrect = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = model('User', schema);