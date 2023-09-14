const db = require("../models");

const Products = db.Products;

exports.findAll = (req, res) => {
    Products.findAll({ raw: true })
        .then((res1) => {
            res.send(res1);
        })
        .catch((err) => res.send(err));
};

exports.create = (req, res) => {
    Products.create({
        image: req.file.path,
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        description: req.body.description,
        brandId: req.body.brandId,
    })
        .then((res1) => {
            // Products.findByPk(res1.id)
            //     .then((res2) => {
            //         res.send(res2);
            //     })
            //     .catch((err2) => {
            //         res.send(err2);
            //     });
            res.send({ status: true });
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.findOne = (req, res) => {
    Products.findByPk(req.params.id)
        .then((res1) => {
            if (res1) {
                res.send(res1);
            } else {
                res.send("Not found");
            }
        })
        .catch((err) => res.send(err));
};

exports.update = (req, res) => {
    Products.update(
        {
            image: req.file.path,
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            description: req.body.description,
            brandId: req.body.brand,
        },
        {
            where: { id: req.params.id },
        }
    )
        .then((res1) => {
            if (res1[0] !== 0) {
                // Products.findByPk(req.params.id)
                //     .then((res2) => {
                //         res.send(res2);
                //     })
                //     .catch((err2) => {
                //         res.send(err2);
                //     });
                res.send({ status: true });
            } else {
                res.send({ status: false, message: "Not found!" });
            }
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.delete = (req, res) => {
    Products.destroy({
        where: { id: req.params.id },
    })
        .then((res1) => {
            if (res1) {
                res.send({ status: true });
            } else {
                res.send({ status: false, message: "Not found!" });
            }
        })
        .catch((err) => {
            res.send(err);
        });
};
