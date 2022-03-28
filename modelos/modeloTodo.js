const mongoose = require( 'mongoose' );

const SchemaTodo = new mongoose.Schema({
    id : {
        type : Number,
        required : true,
        unique : true
    },
    nombre : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    }
});

const Todo = mongoose.model( 'todos', SchemaTodo );

module.exports = {
    Todo,
    SchemaTodo
}