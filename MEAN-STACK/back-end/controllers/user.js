'use strict'                                    //de usa para usar nuevas funcionalidaddes de javascript

//cargar modulos
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');                      //fs = file system ayuda a trabajar con los ficheros de node.js
var path = require('path');                  //esto es para poder acceder a rutas de archivos

//cargar modelos
var User = require('../models/User');


//servicios

var jwt = require('../services/jwt');


//acciones
function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando el controladro usuario y la accion de pruebas',
        user: req.user
    });
}

function saveUser(req, res) {
    //crear un objeto del usuario
    var user = new User();

    //recoger parametros que llegan por la peticion
    var params = req.body;

    if (params.password && params.name && params.surname && params.email) {

        //Asignar valores al objeto usuario
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.image = null;
        user.role = 'ROLE_USER';

        //buscar usuario repetido en la base de datos
        User.findOne({ email: user.email.toLowerCase() }, (err, issetUser) => {
            if (err) {
                res.status(500).send({ message: 'error al comprobar al usuario' })
            } else {
                if (!issetUser) {
                    //cifrar contraseña y almacenar usuario
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;

                        //Guardar Usuario
                        user.save((err, userStored) => {
                            if (err) {
                                res.status(500).send({ message: 'error al guardar' });
                            } else {
                                if (!userStored) {
                                    res.status(404).send({ message: 'no se ha registrado el usuario' });

                                } else {
                                    res.status(200).send({ user: userStored });

                                }
                            }
                        });
                    });
                } else {
                    res.status(500).send({ message: 'el usuario ya existe' });
                }
            }
        });
    } else {
        res.status(200).send({ message: 'Introduce los datos correctamente' });

    }
}

function login(req, res) {

    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({ email: params.email.toLowerCase() }, (err, issetEmail) => {
        if (err) {
            res.status(500).send({ message: 'error al comprobar al usuario' })
        } else {
            if (issetEmail) {
                bcrypt.compare(password, issetEmail.password, (err, check) => {
                    if (check) {

                        //comprobar y generar el token
                        if (params.gettoken) {
                            //devolver token
                            res.status(200).send({
                                token: jwt.createToken(issetEmail)
                            });

                        } else {
                            res.status(200).send({ issetEmail });
                        }

                    } else {
                        res.status(404).send({
                            message: 'El usuario no ha podido loggearse correctamente'
                        });
                    }
                });
            } else {
                res.status(404).send({ message: 'El usuario no ha podido loggearse' });
            }
        }
    });
}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;
    delete update.password;
    
    if (userId != req.user.sub) {
        return res.status(500).send({ message: 'no tienes permiso para actualizar al usuario' })
    }
    User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => { //{new:true} es para devolver el objeto actualizado
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el usuario' });
        } else {
            if (!userUpdated) {
                res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
            } else {
                res.status(200).send({ user: userUpdated });
            }
        }
    });
}

function uploadImage(req, res) {
    var userId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {                                                 //comprobar si existe un archivo con files gracias a multiparty
        var file_path = req.files.image.path;                      //file_path seria la ruta del fichero que se subio
        var file_split = file_path.split('/');                   //sacar solo el nombre del fichero
        var file_name = file_split[2];                             //se asigna el nombre del fichero a file_name

        var ext_split = file_name.split('.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            if (userId != req.user.sub) {
                return res.status(500).send({ message: 'no tienes permiso para actualizar al usuario' })
            }
            User.findByIdAndUpdate(userId, { image: file_name }, { new: true }, (err, imageUpdated) => {
                if (err) {
                    res.status(500).send({ message: 'Error al actualizar el usuario' });
                } else {
                    if (!imageUpdated) {
                        res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
                    } else {
                        res.status(200).send({ user: imageUpdated, image: file_name });
                    }
                }
            });
        } else {
            fs.unlink(file_path, (err) => {                // unlink es para borrar un archivo en la ruta file_path
                if (err) {
                    res.status(404).send({ message: 'La extension no es valida y archivo no borrado' });
                } else {
                    res.status(404).send({ message: 'La extension no es valida' });
                }
            });
        }
    } else {
        res.status(404).send({ message: 'No se ha subido el fichero' });
    }
}

function getImageFile(req,res){
    var imageFile = req.params.imageFile;               //recoger el parametro de la url del fichero
    var path_file = `./uploads/users/${imageFile}`;

    fs.exists(path_file,(exists)=>{
        if (exists) {
        res.sendFile(path.resolve(path_file)); 
        } else {
            res.status(404).send({ message:'La imagen no existe' });
        }
    });
}

function getKeepers(req,res) {

    User.find({role:'ROLE_ADMIN'}).exec((err,users)=>{
        if (err) {
            res.status(500).send({ message:'Error en la peticion' });
        } else {
            if (!users) {
                res.status(404).send({ message:'No hay Cuidadores' });
            } else {
                res.status(200).send({ users });
            }
        }
    });

}
module.exports = {
    pruebas,
    saveUser,
    login,
    updateUser,
    uploadImage,
    getImageFile,
    getKeepers
}