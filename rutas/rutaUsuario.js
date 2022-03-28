const express = require( 'express' );
const ControladorUsuario = require( './../controladores/controladorUsuario' );
const UsuarioRouter = express.Router();

UsuarioRouter.post( '/crear', ControladorUsuario.crearUsuario );
UsuarioRouter.get( '/getAll', ControladorUsuario.obtenerUsuarios );
UsuarioRouter.get( '/getById/:nombreUsuario', ControladorUsuario.obtenerUsuarioPorId );
UsuarioRouter.delete( '/eliminar/:nombreUsuario', ControladorUsuario.eliminarUsuario );

module.exports = UsuarioRouter;


