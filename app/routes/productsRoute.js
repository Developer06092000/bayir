const uploadFile = require("../middleware/uploadImage.js");
const verifyToken = require("../middleware/verifyToken.js");

module.exports = (app) => {
    const route = require("../controllers/productsController.js");
    var router = require("express").Router();

    router.get("/", route.findAll);
    router.get("/:id/", route.findOne);
    router.post(
        "/",
        verifyToken,
        uploadFile.fields([
            { name: "img_list", maxCount: 5 },
            { name: "img", maxCount: 1 },
        ]),
        route.create
    );
    router.patch("/:id/", verifyToken, uploadFile.single("image"), route.update);
    router.delete("/:id/", verifyToken, route.delete);

    // router.post("/", verifyToken, uploadFile.single("image"), route.create);
    // router.patch("/:id/", verifyToken, uploadFile.single("image"), route.update);
    // router.delete("/:id/", verifyToken, route.delete);

    app.use("/products", router);
};
