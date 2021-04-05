'use strict'
const userModel = require('../../models/users.model');
const warning = require('../../utils/warnings/warnings.message')

exports.getUsers = (req, res) => {
    const userROL = req.user.rol;
    if(userROL === "ROL_ADMINAPP"){
        userModel.find({}, (err, documents) => {
            if(err){
                warning.message_500(res)
            }else if(documents.length >= 1){
                res.status(200).send({users: documents})
            }else{
                warning.message_404(res, 'users')
            }
        })
    }else{
        warning.message_401(res)
    }
}
exports.updateUser = (req, res) => {
    let body = req.body;
    let userID = req.user.sub;
    if(body && userID){
        userModel.find({_id: userID}, (err, docFound) => {
            if(err){
                warning.message_500(res);
            }else if(docFound && docFound.length >=1){
                if(docFound[0].rol == "ROL_USER"){
                    delete body.rol
                    userModel.findByIdAndUpdate(userID, body,{new: true},(err, docUpdate) => {
                        if(err){
                            warning.message_500(res)
                        }else if(!docUpdate){
                            warning.message_404(res, 'user')
                        }else{
                            res.status(200).send({userUpdated: docUpdate})
                        }
                    });
                }else{
                    warning.message_custom(res, 'You can not update a user that is not yours, STATUS 401')
                }
            }else{
                warning.message_404(res, 'the user')
            }
        })
    }else{
        warning.message_400(res)
    }
}
exports.deleteUser = (req, res) => {
    let userID = req.user.sub;
    if(userID){
        userModel.find({_id: userID}, (err, docFound) => {
            if(err){
                warning.message_500(res);
            }else if(docFound && docFound.length >=1){
                if(docFound[0].rol == "ROL_USER"){
                    userModel.findByIdAndRemove(userID, (err, docRemoved) => {
                        if(err){
                            warning.message_500(res)
                        }else if(!docRemoved){
                            warning.message_404(res, 'user')
                        }else{
                            res.status(200).send([{status: 200}, {userRemoved: docRemoved}])
                        }
                    });
                }else{
                    warning.message_custom(res, 'You can not delete a user that is not yours, STATUS 401')
                }
            }else{
                warning.message_404(res, 'the user')
            }
        })
    }else{
        warning.message_400(res)
    }
} 
