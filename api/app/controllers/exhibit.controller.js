const db = require("../models");                  // Importa el archivo de modelos de la bd
const Exhibit = db.exhibits;                      // Obtiene el modelo de exhibit desde la bd

const Op = db.Sequelize.Op;                       //Obtiene el operador Sequelize para realizar consultas

/*-- Controlador para traer todos los registros de exhibiciones  --*/
exports.getAllExhibit = async (req, res) => {
    try {
        const exhibit = await Exhibit.findAll(); // Recupera todos las exhibiciones de la tabla exhibits
        return res.send(exhibit);                       // Devuelve los usuarios en la respuesta
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
};

/*-- Controlador para mostrar solo un registro de exhibición --*/
exports.getExhibit = async (req, res) => {
    try {
        const exhibit = await Exhibit.findByPk(req.params.exhibitID); //Busca el registro por su clave primaria

        if(!exhibit){                                                 //En caso de no existir le manda un mensaje de error
            return res.status(404).send({message: 'El registro no existe'});
        }

    } catch (error) {
        return res.status(500).send({message: error.message});
    }
};

/*-- Controlador para crear un registro --*/
exports.createExhibit = async (req, res) => {
    try {
        const { title, short_desc_url, founder, creation_date, categoryID } = req.body;

        const exhibit = await Exhibit.create({
            title,
            short_desc_url,
            founder,
            creation_date,
            categoryID
        });

       return res.status(201).send({ message: 'Artículo registrado con éxito!' });
    } catch (error) {
       return res.status(500).send({ message: error.message });
    }
};


/*-- Controlador para actualizar un registro --*/
exports.updateExhibit = async (req, res) => {
    try {
        const exhibitID = req.params.exhibitID;
        const { title, short_desc_url, founder, creation_date, categoryID } = req.body;
        
        const exhibit = await Exhibit.findByPk(exhibitID);

        if (!exhibit) {
            return res.status(404).send({ message: 'No existe el registro' });
        }

        exhibit.title = title || exhibit.title;
        exhibit.short_desc_url = short_desc_url || exhibit.short_desc_url;
        exhibit.founder = founder || exhibit.founder;
        exhibit.creation_date = creation_date || exhibit.creation_date;
        exhibit.categoryID = categoryID || exhibit.categoryID;

        await exhibit.save();

        return res.status(200).send({ message: 'Actualizado correctamente' });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};


/*-- Controlador para eliminar un registro--*/
exports.deleteExhibit = async (req, res) => {
    try {
        const exhibitID = req.params.exhibitID;
        const exhibit = await Exhibit.findByPk(exhibitID);
        
        if(!exhibit){
            return res.status(400).send ({message: 'No se encontró el registro'});
        }
        await exhibit.destroy();

        return res.status(201).send ({message: 'Eliminado correctamente!'});
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
};

