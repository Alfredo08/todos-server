const Usuario = require( './../modelos/modeloUsuario' );

const crearUsuario = ( request, response ) => {
    const { nombre, apellido, nombreUsuario } = request.body;

    if( nombre && apellido || nombreUsuario ){
        const nuevoUsuario = {
            nombre, apellido, nombreUsuario
        };

        Usuario.create( nuevoUsuario )
            .then( usuarioCreado => {
                return response.status( 201 ).json( usuarioCreado );
            })
            .catch( err => {
                response.statusMessage = "Hubo un error al ejecutar el insert. " + err;
                return response.status( 400 ).end();
            });
    }
    else{
        response.statusMessage = "Se necesita proporcionar 'nombre', 'apellido', 'nombreUsuario'."
        return response.status( 406 ).end();
    }
}

const obtenerUsuarios = ( request, response ) => {
    Usuario.find()
        .populate( 'todos', ['nombre', 'status', 'id'] )
        .then( listaUsuarios => {
            return response.status( 200 ).json( listaUsuarios );
        })
        .catch( err => {
            response.statusMessage = "Hubo un error al ejecutar el insert. " + err;
            return response.status( 400 ).end();
        });
}

const eliminarUsuario = ( request, response ) => {
    const { nombreUsuario } = request.params;

    Usuario.deleteOne( {nombreUsuario} )
        .then( () => {
            return response.status( 204 ).end()
        })
        .catch( err => {
            response.statusMessage = "Hubo un error al ejecutar el insert. " + err;
            return response.status( 400 ).end();
        });
}

const obtenerUsuarioPorId = ( request, response ) => {
    const {nombreUsuario} = request.params;

    Usuario.find({nombreUsuario})
        .populate( 'todos', ['id', 'status', 'nombre'])
        .then( listaUsuarios => {
            return response.status( 200 ).json( listaUsuarios[0] );
        })
        .catch( err => {
            response.statusMessage = "Hubo un error al ejecutar el insert. " + err;
            return response.status( 400 ).end();
        });
}

const ControladorUsuario = {
    crearUsuario,
    obtenerUsuarios,
    eliminarUsuario,
    obtenerUsuarioPorId
}

module.exports = ControladorUsuario;