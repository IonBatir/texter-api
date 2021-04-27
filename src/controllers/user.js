const User = require('../models/user');

function get(id) {
    return User.findById(id);
}

function getAll() {
    return User.find();
}

function getByUsername(username) {
    return User.find({username: new RegExp(username, 'i')});
}

function add(email, username, password) {
    return User.create({email, username, password});
}

function updateUsername(id, username) {
    return User.findByIdAndUpdate(id, {username});
}

function updatePassword(id, password) {
    return User.findByIdAndUpdate(id, {password});
}

function updateBio(id, bio) {
    return User.findByIdAndUpdate(id, {bio});
}

function updateLastAccess(id) {
    return User.findByIdAndUpdate(id, {lastAccess: Date.now()});
}

function updateAvatar(id, avatar) {
    return User.findByIdAndUpdate(id, {avatar});
}

function remove(id) {
    return User.findByIdAndDelete(id);
}

module.exports = {
    get,
    getAll,
    getByUsername,
    add,
    updateAvatar,
    updateBio,
    updateLastAccess,
    updatePassword,
    updateUsername,
    remove
};