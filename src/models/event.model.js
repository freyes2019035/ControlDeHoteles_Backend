const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const eventModel = Schema({
    name: String,
    description: String,
    images: Array,
    typeOfEvent: {type: Schema.Types.ObjectId, ref: 'typeOfEvent'},
    hour: String,
    date: Date,
    hotel: {type: Schema.Types.ObjectId, ref: 'hotel'},
    creator: {type: Schema.Types.ObjectId, ref: 'user'},
    creation_date: Date
});


module.exports = mongoose.model('event', eventModel)