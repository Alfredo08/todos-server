const jwt = require( 'jsonwebtoken' );
const secreto = "estoessecreto";

function validarToken( request, response, next ){
    const token = request.headers['api-token'];

    jwt.verify( token, secreto, ( err , decodificado ) => {
        if( err ){
            response.statusMessage = "Not authorized";
            return response.status( 406 ).end();
        }
        else{
            next();
        }
    });
}

module.exports = validarToken;