const express = require( 'express' );
const ControladorUsuario = require( './../controladores/controladorUsuario' );
const UsuarioRouter = express.Router();
const validarToken = require( './../util/validarToken' );

UsuarioRouter.post( '/register', ControladorUsuario.crearUsuario );
UsuarioRouter.post( '/login', ControladorUsuario.login )
UsuarioRouter.get( '/getAll', validarToken, ControladorUsuario.obtenerUsuarios );
UsuarioRouter.get( '/getById/:nombreUsuario', validarToken, ControladorUsuario.obtenerUsuarioPorId );
UsuarioRouter.delete( '/delete/:nombreUsuario', validarToken, ControladorUsuario.eliminarUsuario );
UsuarioRouter.post( '/validateToken', ControladorUsuario.validarToken );

module.exports = UsuarioRouter;


