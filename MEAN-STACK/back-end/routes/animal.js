'use strict' //de usa para usar nuevas funcionalidaddes de javascript

var express = require('express');
var animalController = require('../controllers/animal');

var md_auth=require('../middlewares/authenticated');
var md_admin=require('../middlewares/is_admin');

var api = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/animals'})




api.get('/pruebas-animales',md_auth.ensureAuth, animalController.pruebas);
api.post('/save-animal',[md_auth.ensureAuth,md_admin.isAdmin], animalController.saveAnimal);
api.get('/list-animals', animalController.getAnimals);
api.get('/animal/:id', animalController.getAnimal);
api.put('/animal/:id',[md_auth.ensureAuth,md_admin.isAdmin] ,animalController.updateAnimal);
api.post('/upload-image-animal/:id',[md_auth.ensureAuth,md_admin.isAdmin, md_upload], animalController.uploadImageAnimal);
api.get('/get-image-animal/:imageFile', animalController.getImageFileAnimal);
api.delete('/animal/:id',[md_auth.ensureAuth,md_admin.isAdmin], animalController.deleteAnimal);




module.exports = api;