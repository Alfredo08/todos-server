
const express = require( 'express' );
const app = express();

const todos = [{
    nombre : 'Aprender componentes de tipo clase.',
    status : 'En progreso',
    id : 123
  },
  {
    nombre : 'Aprender eventos en React.',
    status : 'En progreso',
    id : 456
  }];

app.use( express.json() );
// app.use( express.urlencoded( { extended : true} ));

app.get( '/api/todos', ( request, response ) => {
    return response.status( 200 ).json( todos );
});

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

app.post( '/api/todo/nuevo', ( request, response ) => {

    const { nombre, id, status } = request.body;
    
    if( !nombre || !id || !status ){
        response.statusMessage = "Para crear un nuevo Todo es necesario enviar 'nombre', 'id', 'status'.";
        return response.status( 406 ).end();
    }
    else{
        const todoEncontrado = todos.find( ( todo ) => todo.id === id );

        if( todoEncontrado ){
            response.statusMessage = "El id enviado ya se encuentra en nuestra lista de Todos. Utilizar uno diferente!";
            return response.status( 406 ).end(); 
        }
        else{
            const nuevoTodo = {
                id, nombre, status
            };
            /*
            const nuevoTodo = {
                id : id,
                nombre : nombre,
                status : status
            } */

            todos.push( nuevoTodo );
            return response.status( 201 ).json( nuevoTodo );  
        }
    }
});

app.put( '/api/todo/actualizar', ( request, response ) => {
    const { id, status, nombre } = request.body;

    const todoEncontrado = todos.find( ( todo ) => todo.id === id );
    const indiceTodo = todos.findIndex( ( todo) => todo.id === id );

    if( todoEncontrado ){
        todos[ indiceTodo ] = {
            id : id,
            status : (status) ? status : todos[indiceTodo].status,
            nombre : (nombre) ? nombre : todos[indiceTodo].nombre 
        }

        return response.status( 202 ).json( todos[ indiceTodo ] );
    }
    else{
        response.statusMessage = "Todo no encontrado con id " + id;
        return response.status( 404 ).end();
    }

});

app.delete( '/api/todo/eliminar/:id', ( request, response ) => {
    const {id} = request.params;

    const indiceTodo = todos.findIndex( ( todo) => todo.id === Number( id ) );

    if( indiceTodo === -1 ){
        response.statusMessage = "Todo no encontrado con id " + id;
        return response.status( 404 ).end();
    }
    else{
        todos.splice( indiceTodo, 1 );
        return response.status( 204 ).end();
    }
});

app.listen( 8080, () => {
    console.log( "El servidor se encuentra corriendo en el puerto 8080" );
});

