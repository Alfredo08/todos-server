const mongoose = require( 'mongoose' );

const SchemaTodo = new mongoose.Schema({
    id : {
        type : Number,
        required : [true, "El id debe de ser proporcionado!"],
        unique : [true, "El id debe de ser único!"]
    },
    nombre : {
        type : String,
        required : [true, "El nombre debe de ser proporcionado!"]
    },
    status : {
        type : String,
        required : [true, "El status debe de ser proporcionado!"]
    }
});

const Todo = mongoose.model( 'todos', SchemaTodo );

module.exports = {
    Todo,
    SchemaTodo
}