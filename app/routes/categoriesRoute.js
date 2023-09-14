module.exports = (app) => {
    const route = require("../controllers/categoriesController.js");
    var router = require("express").Router();

    router.get("/", route.findAll);
    router.get("/:id/", route.findOne);
    router.post("/", route.create);
    router.patch("/:id/", route.update);
    router.delete("/:id/", route.delete);

    // router.post("/", verifyToken, uploadFile.single("image"), route.create);
    // router.put("/:id/", verifyToken, uploadFile.single("image"), route.update);
    // router.patch("/:id/", verifyToken, uploadFile.single("image"), route.update);
    // router.delete("/:id/", verifyToken, route.delete);

    app.use("/categories", router);
};
