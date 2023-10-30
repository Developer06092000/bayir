module.exports = (app) => {
    require("./brandsRoute.js")(app);
    require("./categoriesRoute.js")(app);
    require("./productsRoute.js")(app);
    require("./authRoute.js")(app);
};
