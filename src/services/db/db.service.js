'use strict'
const mongo = require('mongoose');
mongo.Promise = global.Promise;


exports.connectToDB = () => {
    return new Promise((resolve, reject) => {
        mongo.connect("mongodb://localhost:27017/dbKinalControlHoteles", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(response => {
            resolve('Correctly connected to Mongo ...')
        }).catch(error => {
            reject(error)
        });
    })
}