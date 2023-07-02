/* -- Importa el archivo de modelos de la base de datos -- */
const db = require("../models");

/* -- Obtiene los roles definidos en la base de datos -- */
const ROLES = db.ROLES;

/* -- Obtiene el modelo de usuario desde la base de datos -- */
const User = db.user;

/*-- Obtiene el modelo de información del usuario desde la base de datos --*/
const Persons = db.persons;


/* -- Middleware para verificar si el nombre de usuario o correo electrónico ya están en uso -- */
checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Verificar nombre de usuario
    let user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (user) {
      return res.status(400).send({
        message: "Failed! Username is already in use!"
      });
    }

    // Verificar correo electrónico
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (user) {
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};


/* -- Middleware para verificar si los roles existen -- */
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  next();
};

/*-- Middleware para verificar que el usuario entre su nombre --*/
checkName = (req, res, next) => {
  const nombre = req.body.name;
  if(!nombre){  //Se asegura de que el usuario esté entrando un nombre
    return res.status(400).send({
      message: "Fallo! Por favor escribe un nombre"
    });
  }
  if(/\d/.test(nombre)) { //Se asegura de que ese nombre no posea números
    return res.status(400).send({
      message: "Fallo! El nombre no puede contener números"
    });
  }
  next();
};

/*-- Middleware para verificar que el usuario entre su apellido --*/
checkLastName = (req, res, next) => {
  const apellido = req.body.last_name;
  if(!apellido){ //Se asegura de que el usuario esté entrando un apellido
    return res.status(400).send({ 
      message: "Fallo! Por favor escribe un apellido"
    });
  }
  if(/\d/.test(apellido)){ //Se asegura de que ese apellido no posea números
    return res.status(400).send({ 
      message: "Fallo! El apellido no puede contener números"
    });
  }
  next();
};

/*-- Middleware para verificar que el usuario entre una fecha de nacimiento --*/
checkBirthDate = (req, res, next) =>{
  const birth = req.body.birth_date;
  if(!birth){
    return res.status(400).send({ //Manda mensaje de error 
      message: "Fallo! El usuario debe agregar fecha de nacimiento"
    });
  }
  next();
};

/*-- Middleware para verificar que el usuario entre su cédula --*/
checkIdentification = (req, res, next) => {
  const identification = req.body.identification;
  if(!identification){
    return res.status(400).send({
      message: "Fallo! El usuario debe tener una cédula"
    });
  }
  next();
};

/* -- Objeto que contiene los middlewares de verificación de registro -- */
const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  checkName,
  checkLastName,
  checkBirthDate,
  checkIdentification
};


/* -- Exporta el objeto verifySignUp como un módulo -- */
module.exports = verifySignUp;
