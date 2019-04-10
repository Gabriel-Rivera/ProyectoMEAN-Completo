'use strict' //de usa para usar nuevas funcionalidaddes de javascript

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

exports.createToken = (user)=>{
    var payLoad = {     //payload es objeto con el que jwt trabajara para generar el token 
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),                //fecha de creacion del token
        exp: moment().add(30,'days').unix    //fecha de expiracion del token
    };

    return jwt.encode(payLoad,secret);
};