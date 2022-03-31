const bcrypt = require( 'bcrypt' );
const saltRounds = 10;
const jwt = require( 'jsonwebtoken' );
const secreto = "estoessecreto";

const Usuario = require( './../modelos/modeloUsuario' );

const crearUsuario = ( request, response ) => {
    const { nombre, apellido, nombreUsuario, password } = request.body;

    if( nombre && apellido && nombreUsuario && password ){

        bcrypt.hash( password,  saltRounds )
            .then( passwordEncryptado => {
                const nuevoUsuario = {
                    nombre, 
                    apellido, 
                    nombreUsuario,
                    password : passwordEncryptado
                };
        
                Usuario.create( nuevoUsuario )
                    .then( usuarioCreado => {
                        const payload = {
                            nombre : usuarioCreado.nombre,
                            apellido : usuarioCreado.apellido,
                            nombreUsuario : usuarioCreado.nombreUsuario
                        };

                        const expiracion = {
                            expiresIn : '20m'
                        }

                        jwt.sign( payload, secreto, expiracion, (err, token) => {
                            return response.status( 201 ).json( {token} );
                        });
                    })
                    .catch( err => {
                        response.statusMessage = "Hubo un error al ejecutar el insert. " + err;
                        return response.status( 400 ).end();
                    });
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

const login = ( request, response ) => {
    const { nombreUsuario, password } = request.body;

    Usuario.findOne( {nombreUsuario} )
        .then( usuarioEncontrado => {
            if( usuarioEncontrado === null ){
                response.statusMessage = "Usuario no encontrado.";
                return response.status( 404 ).end();
            }
            else{
                bcrypt.compare( password, usuarioEncontrado.password )
                    .then( resultado => {
                        if( ! resultado ){
                            response.statusMessage = "Credenciales invalidas.";
                            return response.status( 404 ).end();
                        }
                        else{
                            const payload = {
                                nombre : usuarioEncontrado.nombre,
                                apellido : usuarioEncontrado.apellido,
                                nombreUsuario
                            };

                            const expiracion = {
                                expiresIn : '20m'
                            }

                            jwt.sign( payload, secreto, expiracion, (err, token) => {
                                return response.status( 200 ).json({
                                    mensaje : `Bienvenido de vuelta ${usuarioEncontrado.nombre} ${usuarioEncontrado.apellido}.`,
                                    token
                                });  
                            });
                            
                        } 
                    });
            }
            
        });

}

const validarToken = ( request, response ) => {
    console.log( request.headers );
    const token = request.headers['api-token'];

    jwt.verify( token, secreto, ( err , decodificado ) => {
        if( err ){
            response.statusMessage = "El token ha expirado o es invalido.";
            return response.status( 406 ).end();
        }
        else{
            return response.status(202).json( decodificado );
        }
    });
}

const ControladorUsuario = {
    crearUsuario,
    obtenerUsuarios,
    eliminarUsuario,
    obtenerUsuarioPorId,
    login,
    validarToken
}

module.exports = ControladorUsuario;