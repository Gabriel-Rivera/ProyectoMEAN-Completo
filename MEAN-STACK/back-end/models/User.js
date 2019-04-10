'use strict' //de usa para usar nuevas funcionalidaddes de javascript

var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    image:String,
    role: String
});

module.exports= mongoose.model('User',UserSchema);