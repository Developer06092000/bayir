module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define("products", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        image: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        price: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        discount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        description: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
    });
    return Products;
};
