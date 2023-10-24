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
        title: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        img: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        price_old: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        price_new: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        sale: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        size: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        subtitle: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        description: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        type: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        mebel: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
    });
    return Products;
};
