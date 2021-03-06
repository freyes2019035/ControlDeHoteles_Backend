const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const reservationModel = Schema({
    dateOfReservation: Date,
    dateOfArrive: Date,
    dateOfDeparture: Date,
    noOfDaysOfStay: Number,
    roomID: {type: Schema.Types.ObjectId, ref: 'room'},
    services: [{
        service: {type: Schema.Types.ObjectId, ref: 'service'},
        subTotal: Number
    }],
    subTotalServices: Number,
    subTotalRoom: Number,
    hotel: {type: Schema.Types.ObjectId, ref: 'hotel'},
    user: {type: Schema.Types.ObjectId, ref: 'user'}
});



module.exports = mongoose.model('reservation', reservationModel)