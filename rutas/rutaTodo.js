const express = require( 'express' );
const TodoRouter = express.Router();

const ControladorTodo = require( './../controladores/controladorTodo' );

TodoRouter.post( '/nuevo', ControladorTodo.insertarTodo );
TodoRouter.get( '/getAll', ControladorTodo.obtenerTodos );
TodoRouter.delete( '/eliminar/:id', ControladorTodo.deleteTodo );
TodoRouter.put( '/actualizar', ControladorTodo.actualizarTodo );
module.exports = TodoRouter;