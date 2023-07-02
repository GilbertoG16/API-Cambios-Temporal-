/* -- Importa el middleware de autenticación JWT -- */
const { authJwt } = require("../middleware");


/* -- Importa el controlador de usuarios -- */
const userController = require("../controllers/user.controller");


/* Exporta una función que toma la aplicación app como argumento. 
   Esta función será utilizada por otro archivo para configurar 
   las rutas y el middleware en la aplicación. 
*/
module.exports = function(app) {
  /* -- Middleware para agregar encabezados de control de acceso (CORS) a las respuestas HTTP -- */
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/test/all",          // Ruta GET para acceder a recursos de prueba para todos los usuarios
    userController.allAccess  
  );  
  
  app.get(  
    "/api/test/user",         // Ruta GET para acceder a recursos de prueba solo para usuarios autenticados
    [authJwt.verifyToken],    // Middleware para verificar el token de autenticación JWT
    userController.userBoard  
  );  

  app.get(
    "/api/test/mod",          // Ruta GET para acceder a recursos de prueba solo para moderadores autenticados
    [                         // Middleware para verificar el token de autenticación JWT y el rol de moderador
      authJwt.verifyToken, 
      authJwt.isModerator
    ],
    userController.moderatorBoard
  );

  app.get( 
    "/api/test/admin",        // Ruta GET para acceder a recursos de prueba solo para administradores autenticados
    [                         // Middleware para verificar el token de autenticación JWT y el rol de administrador
      authJwt.verifyToken,  
      authJwt.isAdmin
    ],
    userController.adminBoard
  );

};
