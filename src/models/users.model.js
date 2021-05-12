const mongoose = require('mongoose')
const Schema = mongoose.Schema;;

const userModel = Schema({
    name: String,
    email: String,
    lastName: String,
    username: String,
    password: String,
    rol: String,

});

module.exports = mongoose.model('user', userModel);



