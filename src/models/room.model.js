const moongose = require('mongoose');
const Schema = moongose.Schema;

const roomSchema = Schema({
    name: String,
    price: Number,
    images: Array,
    hotel: {type: Schema.Types.ObjectId, ref: 'hotel'},
    creator: {type: Schema.Types.ObjectId, ref: 'user'}
})


module.exports = moongose.model("room", roomSchema)