const Todo = require( './../modelos/modeloTodo' );

const insertarTodo = ( request, response ) => {

    const { nombre, id, status } = request.body;
    
    if( !nombre || !id || !status ){
        response.statusMessage = "Para crear un nuevo Todo es necesario enviar 'nombre', 'id', 'status'.";
        return response.status( 406 ).end();
    }
    else{
        const nuevoTodo = {
            nombre, id, status
        };

        Todo.create( nuevoTodo )
            .then( datoNuevo => {
                return response.status( 201 ).json( datoNuevo );
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

    Todo.findOneAndUpdate( {id}, { $set : todoActualizado}, {new : true} )
        .then( (datoTodo) => {
            return response.status( 202 ).json( datoTodo );
        })
        .catch( err => {
            response.statusMessage = "Hubo un error al ejecutar el update. " + err;
            return response.status( 400 ).end();
        });
}

const ControladorTodo = {
    insertarTodo,
    obtenerTodos,
    deleteTodo,
    actualizarTodo
};

module.exports = ControladorTodo;