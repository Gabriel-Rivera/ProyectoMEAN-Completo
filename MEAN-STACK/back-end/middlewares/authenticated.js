'use strict' //de usa para usar nuevas funcionalidaddes de javascript

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';


exports.ensureAuth = (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(403).send({message:'La peticion no tiene la cabecera de autenticacion'});
    }
        var token = req.headers.authorization.replace(/['"]+/g, '');

        //decodoficar el token
        try {
            var payLoad = jwt.decode(token,secret); //en payload se guarda el objeto que decodifica el token

            if(payLoad.exp <= moment().unix()){
                res.status(401).send({
                    message:'el token ha expirado'
                });
            }
        } catch (ex) {
            res.status(404).send({
                message:'el token no es valido'
            });
        }
    
    req.user = payLoad;
    next();
}