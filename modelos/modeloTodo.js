const mongoose = require( 'mongoose' );

const SchemaTodo = new mongoose.Schema({
    id : Number,
    nombre : String,
    status : String
});

const Todo = mongoose.model( 'todos', SchemaTodo );

module.exports = Todo;
