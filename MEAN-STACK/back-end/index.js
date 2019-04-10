'use strict' //de usa para usar nuevas funcionalidaddes de javascript

var mongoose  = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

mongoose.connect('mongodb://localhost:27017/zoo',(err,res)=>{
    if(err){
        throw err;
    }else{
        console.log("Conexion exitosa");
        app.listen(port,()=>{
            console.log("el servidor local con Node y Express esta corriendo");            
        })
    }
});