module.exports = (sequelize, Sequelize) => {
    const Images = sequelize.define("images", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        path: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        product: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
    return Images;
};
