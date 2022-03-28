
const Usuario = require( './../modelos/modeloUsuario' );
const {Todo} = require( './../modelos/modeloTodo' );

const insertarTodo = ( request, response ) => {

    const { nombre, id, status, nombreUsuario } = request.body;
    
    if( !nombre || !id || !status || !nombreUsuario ){
        response.statusMessage = "Para crear un nuevo Todo es necesario enviar 'nombre', 'id', 'status', 'nombreUsuario'.";
        return response.status( 406 ).end();
    }
    else{
        Usuario.find( {nombreUsuario} )
            .then( usuarioEncontrado => {
                if( usuarioEncontrado.length === 0 ){
                    response.statusMessage = "Usuario no encontrado.";
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
                                    return response.status( 201 ).json( datoNuevo );
                                });
                        })
                        .catch( err => {
                            response.statusMessage = "Hubo un error al ejecutar el insert. " + err;
                            return response.status( 400 ).end();
                        });
                }
            })
            .catch( err => {
                response.statusMessage = "Hubo un error al ejecutar el insert. " + err;
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
            response.statusMessage = "Hubo un error al ejecutar el find. " + err;
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
            response.statusMessage = "Hubo un error al ejecutar el delete. " + err;
            return response.status( 400 ).end();
        });
}

const actualizarTodo = ( request, response ) => {
    const { id, status, nombre } = request.body;
    const todoActualizado = {
        id, status, nombre
    };
    console.log( todoActualizado );

    Todo.findOneAndUpdate( {id}, { $set : todoActualizado}, {new : true} )
        .then( (datoTodo) => {
            return response.status( 202 ).json( datoTodo );
        })
        .catch( err => {
            response.statusMessage = "Hubo un error al ejecutar el update. " + err;
            return response.status( 400 ).end();
        });

    /* Pendiente por hacer: actualizar listado de Usuarios */
}

const ControladorTodo = {
    insertarTodo,
    obtenerTodos,
    deleteTodo,
    actualizarTodo
};

module.exports = ControladorTodo;