'use strict' //de usa para usar nuevas funcionalidaddes de javascript

var express = require('express');
var userController = require('../controllers/user');
var md_auth=require('../middlewares/authenticated');
var api = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/users'})




api.get('/pruebas-del-controlador',md_auth.ensureAuth, userController.pruebas);
api.post('/register',userController.saveUser)
api.post('/login',userController.login)
api.put('/update-user/:id',md_auth.ensureAuth, userController.updateUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth,md_upload], userController.uploadImage);
api.get('/get-image-user/:imageFile', userController.getImageFile);
api.get('/get-keepers', userController.getKeepers);





module.exports = api;