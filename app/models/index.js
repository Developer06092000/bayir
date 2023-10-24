const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    // operatorsAliases: false,
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false,
    //     },
    // },
    define: {
        timestamps: false,
    },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Categories = require("./categoriesModels.js")(sequelize, Sequelize);
db.Brands = require("./brandsModels.js")(sequelize, Sequelize);
db.Products = require("./productsModels.js")(sequelize, Sequelize);
db.Images = require("./imagesModels.js")(sequelize, Sequelize);

// db.Categories.hasMany(db.Brands);
// db.Brands.hasMany(db.Products);

module.exports = db;
