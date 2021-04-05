const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceModel = Schema({
    name: String,
    description: String,
    price: Number,
    hotel: {type: Schema.Types.ObjectId, ref: 'hotel'},
    creator: {type: Schema.Types.ObjectId, ref: 'users'}
});

module.exports = mongoose.model(serviceModel, 'service')