
'use strict' //de usa para usar nuevas funcionalidaddes de javascript

var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var AnimalSchema = Schema({
    name: String,
    description: String,
    year: Number,
    image: String,
    user:{type:Schema.Types.ObjectId, ref:'User'}
    // user: { type : Schema.ObjecId, ref:'User' }
});

module.exports= mongoose.model('Animal',AnimalSchema);