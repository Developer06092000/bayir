module.exports = (app) => {
    const route = require("../controllers/authControllers.js");
    var router = require("express").Router();

    router.post("/register-users/", route.create);
    router.post("/login/", route.login);
    router.post("/changePassword/", route.update);
    router.delete("/delete/", route.delete);

    app.use("/users", router);
};
