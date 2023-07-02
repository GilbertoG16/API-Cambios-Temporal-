/* -- Importa la configuración de la base de datos desde el archivo db.config.js --*/
const config = require("../config/db.config.js");


/* -- Importa la biblioteca Sequelize para la administración de la base de datos -- */
const Sequelize = require("sequelize");


/* -- Crea una instancia de Sequelize para establecer la conexión a la base de datos -- */
const sequelize = new Sequelize(
  config.DB,         // Nombre de la base de datos obtenido de la configuración
  config.USER,       // Nombre de usuario de la base de datos obtenido de la configuración
  config.PASSWORD,   // Contraseña de la base de datos obtenida de la configuración
  {
    host: config.HOST,                 // Host de la base de datos obtenido de la configuración
    dialect: config.dialect,           // Dialecto de la base de datos obtenido de la configuración
    pool: {                            // * Configuración del grupo de conexiones de la base de datos
      max: config.pool.max,            // Número máximo de conexiones en el grupo
      min: config.pool.min,            // Número mínimo de conexiones en el grupo
      acquire: config.pool.acquire,    // Tiempo máximo de adquisición de una conexión en milisegundos
      idle: config.pool.idle           // Tiempo máximo de inactividad de una conexión en milisegundos
    }
  }
);



/* -- Objeto para almacenar los modelos y otras configuraciones de la base de datos --*/
const db = {};
db.Sequelize = Sequelize;   // Asigna el objeto Sequelize al objeto db
db.sequelize = sequelize;   // Asigna la instancia de Sequelize (conexión a la base de datos) al objeto db



/* -- Importa el modelo de usuario y lo asocia con la conexión a la base de datos -- */
db.user = require("../models/user.model.js")(sequelize, Sequelize);
/* -- Importa el modelo de rol y lo asocia con la conexión a la base de datos -- */
db.role = require("../models/role.model.js")(sequelize, Sequelize);
/* -- Importa el modelo de datos de los usuarios y lo asocia con la conexión a la base de datos -- */
db.persons = require ("../models/persons.model.js")(sequelize, Sequelize);
/*-- Importa el modelo de los datos de exhibits y lo asocia con la conexión a la base de datos --*/
db.exhibits = require("../models/exhibits.model.js")(sequelize, Sequelize);
/*-- Importa el modelo de las métricas de persons-exhibits --*/
db.exhibitsPersonsMetrics = require("../models/exhibits_persons_metrics.model.js")(sequelize, Sequelize);
/*-- Importa el modelo de los datos de categories --*/
db.categories = require("../models/categories.model.js")(sequelize, Sequelize);

/* -- Establece una relación de muchos a muchos entre los roles y los usuarios -- */
db.role.belongsToMany(db.user, {
  through: "user_roles"   // Utiliza la tabla "user_roles" como tabla intermedia para la relación
});
/* -- Establece una relación de muchos a muchos entre los usuarios y los roles -- */
db.user.belongsToMany(db.role, {
  through: "user_roles"   // Utiliza la tabla "user_roles" como tabla intermedia para la relación
});

/* -- Establece la relación uno a uno entre user y persons -- */
db.user.hasOne(db.persons, {
  foreignKey: 'userID',
});
db.persons.belongsTo(db.user,{
  foreignKey: 'userID'
});

/*-- Estable la relación de 1 a muchos entre categories y exhibits --*/
db.exhibits.belongsTo(db.categories, 
  {foreignKey: "categoryID"
});
db.categories.hasMany(db.exhibits, 
  {foreignKey: "categoryID"
});

/*-- Establece la relación de muchos a muchos entre exhibits y persons --*/
db.exhibits.belongsToMany(db.persons,{
  through: db.exhibitsPersonsMetrics, foreignKey: "exhibitID"
});
db.persons.belongsToMany(db.exhibits,{
  through: db.exhibitsPersonsMetrics, foreignKey: "personID"
});



/* -- Define los roles disponibles en la base de datos -- */
db.ROLES = ["user", "admin", "moderator"];


/* -- Exporta el objeto db para que pueda ser utilizado en otros archivos -- */
module.exports = db;
