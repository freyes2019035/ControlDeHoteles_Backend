const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const recipeSchema = Schema({
    emision_date: Date,
    reservation: {type: Schema.Types.ObjectId, ref: 'reservation'},
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    total: Number
});


module.exports = mongoose.model('recipe', recipeSchema);