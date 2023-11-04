const express = require( 'express' );
const TodoRouter = express.Router();

const ControladorTodo = require( './../controladores/controladorTodo' );

TodoRouter.post( '/new', ControladorTodo.insertarTodo );
TodoRouter.get( '/getAll', ControladorTodo.obtenerTodos );
TodoRouter.delete( '/delete/:id', ControladorTodo.deleteTodo );
TodoRouter.put( '/update', ControladorTodo.actualizarTodo );
TodoRouter.get( '/getByUserId/:id', ControladorTodo.getByUserId)
module.exports = TodoRouter;