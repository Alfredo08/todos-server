const express = require( 'express' );
const ControladorUsuario = require( './../controladores/controladorUsuario' );
const UsuarioRouter = express.Router();

UsuarioRouter.post( '/registrar', ControladorUsuario.crearUsuario );
UsuarioRouter.post( '/login', ControladorUsuario.login )
UsuarioRouter.get( '/getAll', ControladorUsuario.obtenerUsuarios );
UsuarioRouter.get( '/getById/:nombreUsuario', ControladorUsuario.obtenerUsuarioPorId );
UsuarioRouter.delete( '/eliminar/:nombreUsuario', ControladorUsuario.eliminarUsuario );
UsuarioRouter.post( '/validarToken', ControladorUsuario.validarToken );

module.exports = UsuarioRouter;


