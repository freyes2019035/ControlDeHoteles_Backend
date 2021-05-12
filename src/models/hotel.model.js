const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelModel = Schema({
    name: String,
    description: String,
    address: String,
    phone: String,
    email: String,
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    images: Array,
    creator: {type: Schema.Types.ObjectId, ref: 'user'},
    creation_Date: Date,
    no_reservations: Number,
})

module.exports = mongoose.model('hotel', hotelModel);