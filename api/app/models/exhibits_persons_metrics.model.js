/*-- Exporta una función que define y devuelve el modelo de usuario --*/
module.exports = (sequelize, Sequelize) => {

    /*-- Define el modelo de exhibits con el nombre de exhibits --*/
    const ExhibitsPersonsMetrics = sequelize.define("exhibits_persons_metrics",{
        exhibitID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'persons',
                key: 'personID'
            }
        },
        personID: {
            type: Sequelize.STRING(10),
            allowNull: false,
            references: {
                model: 'persons',
                key: 'personID'
            }
        },
        visits: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        shares: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        likes: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });
    return ExhibitsPersonsMetrics;
};