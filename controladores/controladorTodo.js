
const Usuario = require( './../modelos/modeloUsuario' );
const {Todo} = require( './../modelos/modeloTodo' );

const insertarTodo = ( request, response ) => {

    const { id, status } = request.body;
    const nombre = request.body.description;
    const nombreUsuario = request.body.userName;
 
    
    if( !nombre || !id || !status || !nombreUsuario ){
        response.statusMessage = "You need to send 'description', 'id', 'status', 'userName'.";
        return response.status( 406 ).end();
    }
    else{
        Usuario.find( {nombreUsuario} )
            .then( usuarioEncontrado => {
                if( usuarioEncontrado.length === 0 ){
                    response.statusMessage = "User not found.";
                    return response.status( 404 ).end();
                }
                else{
                    const nuevoTodo = {
                        nombre, id, status
                    };
            
                    Todo.create( nuevoTodo )
                        .then( datoNuevo => {
                            Usuario.findOneAndUpdate( {nombreUsuario}, { $push : { todos : datoNuevo._id } } )
                                .then( () => {
                                    const newTodo = {
                                        id : datoNuevo.id,
                                        description : datoNuevo.nombre,
                                        status : datoNuevo.status
                                    }
                                    return response.status( 201 ).json( newTodo );
                                });
                        })
                        .catch( err => {
                            console.log( err );
                            response.statusMessage = "Error triggering insert! " + err;
                            return response.status( 400 ).json(err);
                        });
                }
            })
            .catch( err => {
                response.statusMessage = "Error triggering insert. " + err;
                return response.status( 400 ).end();
            });
    }
}

const obtenerTodos = ( request, response ) => {
    Todo.find()
        .then( listaTodos => {
            return response.status( 200 ).json( listaTodos );
        })
        .catch( err => {
            response.statusMessage = "Error triggering select. " + err;
            return response.status( 400 ).end();
        });
}

const deleteTodo = ( request, response ) => {
    const {id} = request.params;

    Todo.deleteOne( { id } )
        .then( () => {
            return response.status( 204 ).end(); 
        })
        .catch( err => {
            response.statusMessage = "Error triggering delete. " + err;
            return response.status( 400 ).end();
        });
}

const actualizarTodo = ( request, response ) => {
    const { id, status } = request.body;
    const nombre = request.body.description;
    const todoActualizado = {
        id, status, nombre
    };
    console.log( todoActualizado );

    Todo.findOneAndUpdate( {id}, { $set : todoActualizado}, {new : true} )
        .then( (datoTodo) => {
            return response.status( 202 ).json( datoTodo );
        })
        .catch( err => {
            response.statusMessage = "Error triggering update. " + err;
            return response.status( 400 ).end();
        });
}

const getByUserId = ( request, response ) => {
    const {id} = request.params;
    Usuario.findOne( {nombreUsuario: id} )
            .populate('todos')
            .then( allTodos => {
                const todos = allTodos.todos.map((todo) => {
                    return {
                        id : todo.id,
                        description : todo.nombre,
                        status : todo.status
                    }
                });
                const userWithTodos = {
                    firstName : allTodos.nombre,
                    lastName : allTodos.apellido,
                    userName : allTodos.nombreUsuario,
                    todos : todos
                }
                return response.status( 200 ).json( userWithTodos );
            });
}

const ControladorTodo = {
    insertarTodo,
    obtenerTodos,
    deleteTodo,
    actualizarTodo,
    getByUserId
};

module.exports = ControladorTodo;