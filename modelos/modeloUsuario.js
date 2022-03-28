const mongoose = require( 'mongoose' );
const {SchemaTodo} = require( './modeloTodo' );

const SchemaUsuario = mongoose.Schema({
    nombre : String,
    apellido : String,
    nombreUsuario : String,
    todos : [SchemaTodo]
});

const Usuario = mongoose.model( 'usuarios', SchemaUsuario );

module.exports = Usuario;
