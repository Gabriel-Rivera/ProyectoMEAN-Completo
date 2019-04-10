'use strict'                                    //de usa para usar nuevas funcionalidaddes de javascript

//cargar modulos
var fs = require('fs');                      //fs = file system ayuda a trabajar con los ficheros de node.js
var path = require('path');                  //esto es para poder acceder a rutas de archivos

//cargar modelos
var User = require('../models/User');
var Animal = require('../models/Animal');


//acciones
function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando el controlador animales y la accion de pruebas',
        user: req.user
    });
}

function saveAnimal(req, res) {
    var animal = new Animal();
    var params = req.body;

    if (params.name) {
        animal.name = params.name;
        animal.description = params.description;
        animal.year = params.year;
        animal.image = null;
        animal.user = req.user.sub;

        animal.save((err, animalStored) => {
            if (err) {
                res.status(500).send({ message: 'error en el servidor' });
            } else {
                if (!animalStored) {
                    res.status(404).send({ message: 'no se ha guaradao el animal' });
                } else {
                    res.status(200).send({ animal: animalStored });
                }
            }
        });
    } else {
        res.status(500).send({
            message: 'nombre de animal es obligatorio',
        });
    }
}

function getAnimals(req, res) {
    Animal.find({}).populate({ path: 'user' }).exec((err, animals) => {             //populate se usa para mostrar los datos del usuario mediante su Id con la propiedad {path:'user'}
        if (err) {
            res.status(500).send({ message: 'error en la peticion' });
        } else {
            if (!animals) {
                res.status(404).send({ message: 'no hay animales' });
            } else {
                res.status(200).send({ animals });
            }
        }
    });
}

function getAnimal(req, res) {
    var animalId = req.params.id;

    Animal.findById(animalId)
        .populate({ path: 'user' })
        .exec((err, animal) => {
            if (err) {
                res.status(500).send({ message: 'error en la peticion' });
            } else {
                if (!animal) {
                    res.status(404).send({ message: 'no existe el animal' });
                } else {
                    res.status(200).send({ animal });
                }
            }
        });
}

function updateAnimal(req, res) {
    var animalId = req.params.id;
    var update = req.body;

    Animal.findByIdAndUpdate(animalId, update, { new: true }, (err, animalUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!animalUpdated) {
                res.status(404).send({ message: 'no se ha actualizado el animal' });
            } else {
                res.status(200).send({ animal: animalUpdated });
            }
        }
    });
}


function uploadImageAnimal(req, res) {
    var animalId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {                                                 //comprobar si existe un archivo con files gracias a multiparty
        var file_path = req.files.image.path;                      //file_path seria la ruta del fichero que se subio
        var file_split = file_path.split('/');                   //sacar solo el nombre del fichero
        var file_name = file_split[2];                             //se asigna el nombre del fichero a file_name

        var ext_split = file_name.split('.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            
            Animal.findByIdAndUpdate(animalId, { image: file_name }, { new: true }, (err, animalUpdated) => {
                if (err) {
                    res.status(500).send({ message: 'Error al actualizar el animal' });
                } else {
                    if (!animalUpdated) {
                        res.status(404).send({ message: 'No se ha podido actualizar el animal' });
                    } else {
                        res.status(200).send({ user: animalUpdated, image: file_name });
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

function getImageFileAnimal(req,res){
    var imageFile = req.params.imageFile;               //recoger el parametro de la url del fichero
    var path_file = `./uploads/animals/${imageFile}`;

    fs.exists(path_file,(exists)=>{
        if (exists) {
        res.sendFile(path.resolve(path_file)); 
        } else {
            res.status(404).send({ message:'La imagen no existe' });
        }
    });
}

function deleteAnimal(req,res) {
    var animalId = req.params.id;

    Animal.findByIdAndRemove(animalId,(err,animalRemove)=>{
        if (err) {
            res.status(500).send({message:'error en la peticion'});
        } else {
            if (!animalRemove) {
            res.status(404).send({message:'no se ha podido borrar el animal'});
            } else {
            res.status(200).send({animal:animalRemove});
                
            }
        }
    });
}

module.exports = {
    pruebas,
    saveAnimal,
    getAnimals,
    getAnimal,
    updateAnimal,
    uploadImageAnimal,
    getImageFileAnimal,
    deleteAnimal
};