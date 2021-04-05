const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const typeOfEventModel = Schema({
    name: String,
})


module.exports = mongoose.model('typeOfEvent', typeOfEventModel);