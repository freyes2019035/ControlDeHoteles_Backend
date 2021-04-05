'use strict'
const userModel = require('../models/users.model');


exports.helloWord = (req, res) => {
    userModel.find({}, (err, docs) => {
        res.send(docs);
    })
}
