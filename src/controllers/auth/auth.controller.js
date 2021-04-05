const bcrypt = require('bcrypt-nodejs')
const jwt = require('../../services/auth/auth.service');
const userModel = require('../../models/users.model');
const warning = require('../../utils/warnings/warnings.message')

exports.login = (req, res) => {
    const {user, password, getToken} = req.body;
    if(!user || !password){
        warning.message_400(res)
    }else {
        userModel.findOne({username: user}, (err, user) => {
            (err) 
                ? 
                warning.message_500(res) 
                :
                (user) 
                ? 
                bcrypt.compare(password, user.password, (err, accessGranted) => {
                    if(accessGranted){
                        if(getToken === 'true'){
                            return res.status(200).send({
                                token: jwt.createToken(user),
                            })
                        }else{
                            user.password = undefined;
                            return res.status(200).send({user})
                        }
                    }else{
                        warning.message_401(res)
                    }
                })
                :
                warning.message_404(res, 'the user')
            });
    }
}
exports.createDefault = async (config) => {
    const {name, lastName, email, username, password} = config;
    let user = userModel();
    if(name, lastName, email, username, password){
        user.name = name;
        user.lastName = lastName
        user.email = email;
        user.username = username;
        user.password = await encryptPassword(password);
        user.rol = "ROL_ADMIN";

        userModel.find({
            name: user.name,
            email: user.email,
            username: user.username,
            rol: user.rol
        }, (err, doc) => {
            if(err){
                console.error(new Error('Jmmmm... some error ocurrs'))
            }else if(doc && doc.length >=1){
                console.log({ status: "Admin already exists in Data Base" });
            }else{
                user.save((err, document) => {
                    if(err){
                        console.error(new Error('Jmmmm... some error ocurrs'))
                    }else{
                        console.log([{ status: "Admin Saved" }, { admin: document }]);
                    }
                })
            }
        })
    }else{
        console.error(new Error('Jmmm... ur missing parameters'))
    }
}
const encryptPassword = (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, null, null, (errors, passwordEncrypted) => {
        if (errors) {
          reject(new Error("Some error ocurrss encrypting the password"));
        } else {
          resolve(passwordEncrypted);
        }
      });
    });
};