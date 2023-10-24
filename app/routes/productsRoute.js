const uploadFile = require("../middleware/uploadImage.js");

module.exports = (app) => {
    const route = require("../controllers/productsController.js");
    var router = require("express").Router();

    router.get("/", route.findAll);
    router.get("/:id/", route.findOne);
    // router.post("/", uploadFile.array("img_list"), route.create);
    router.post(
        "/",
        uploadFile.fields([
            { name: "img_list", maxCount: 5 },
            { name: "img", maxCount: 1 },
        ]),
        route.create
    );
    router.patch("/:id/", uploadFile.single("image"), route.update);
    router.delete("/:id/", route.delete);

    // router.post("/", verifyToken, uploadFile.single("image"), route.create);
    // router.patch("/:id/", verifyToken, uploadFile.single("image"), route.update);
    // router.delete("/:id/", verifyToken, route.delete);

    app.use("/products", router);
};
