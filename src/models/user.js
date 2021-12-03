const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    nickname: {
        type: String
    },
    kindId: {
        type: String
    },
    id: {
        type: String
    },
    tel: {
        type: String
    },
    address: {
        type: String
    }

}, {
    collection: "users"
});

module.exports = model('User', userSchema);