const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const typeOfEventModel = Schema({
    name: String,
    creator: {type: Schema.Types.ObjectId, ref: 'user'}
})


module.exports = mongoose.model('typeOfEvent', typeOfEventModel);