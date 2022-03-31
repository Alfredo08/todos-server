const express = require( 'express' );
const ControladorUsuario = require( './../controladores/controladorUsuario' );
const UsuarioRouter = express.Router();
const validarToken = require( './../util/validarToken' );

UsuarioRouter.post( '/registrar', ControladorUsuario.crearUsuario );
UsuarioRouter.post( '/login', ControladorUsuario.login )
UsuarioRouter.get( '/getAll', validarToken, ControladorUsuario.obtenerUsuarios );
UsuarioRouter.get( '/getById/:nombreUsuario', validarToken, ControladorUsuario.obtenerUsuarioPorId );
UsuarioRouter.delete( '/eliminar/:nombreUsuario', validarToken, ControladorUsuario.eliminarUsuario );
UsuarioRouter.post( '/validarToken', ControladorUsuario.validarToken );

module.exports = UsuarioRouter;


