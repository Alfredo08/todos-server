const mongoose = require( 'mongoose' );
const {SchemaTodo} = require( './modeloTodo' );

const SchemaUsuario = mongoose.Schema({
    nombre : {
        type : String,
        required : true
    },
    apellido : {
        type : String,
        required : true
    },
    nombreUsuario : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    todos : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'todos'
    }]
});

const Usuario = mongoose.model( 'usuarios', SchemaUsuario );

module.exports = Usuario;
