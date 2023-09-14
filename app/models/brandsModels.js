module.exports = (sequelize, Sequelize) => {
    const Brands = sequelize.define("brands", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    return Brands;
};
