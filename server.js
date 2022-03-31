const express = require( 'express' );
const cors = require( 'cors' );
require( './config/config' );
const validarToken = require( './util/validarToken' );
const app = express();
const TodoRouter = require( './rutas/rutaTodo' );
const UsuarioRouter = require( './rutas/rutaUsuario' );
app.use( cors() );
app.use( express.json() );

app.use( '/api/todo', validarToken, TodoRouter );
app.use( '/api/usuario', UsuarioRouter);

/*
app.get( '/api/todo/buscar', ( request, response ) => {
    const { id } = request.query;
    // const id = request.query.id;

    const todoEncontrado = todos.find( ( todo ) => todo.id === Number( id ) );
    
    if( todoEncontrado ){
       return response.status( 200 ).json(todoEncontrado); 
    }
    else{
        response.statusMessage = "Todo no encontrado con id " + id;
        return response.status( 404 ).end();
    }
});

app.get( '/api/todo/buscar/:id', ( request, response ) => {
    const { id } = request.params;
    // const id = request.params.id;

    const todoEncontrado = todos.find( ( todo ) => todo.id === Number( id ) );
    
    if( todoEncontrado ){
       return response.status( 200 ).json(todoEncontrado); 
    }
    else{
        response.statusMessage = "Todo no encontrado con id " + id;
        return response.status( 404 ).end();
    }
});

*/
app.listen( 8080, () => {
    console.log( "El servidor se encuentra corriendo en el puerto 8080" );
});

