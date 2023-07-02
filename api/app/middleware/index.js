/* -- Importa el middleware de autenticación JWT  -- */
const authJwt = require("./authJwt");

/* -- Importa el middleware de verificación de registro -- */
const verifySignUp = require("./verifySignUp");


module.exports = {
  authJwt,      // Exporta el middleware de autenticación JWT
  verifySignUp  // Exporta el middleware de verificación de registro
};
