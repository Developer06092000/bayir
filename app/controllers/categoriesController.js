const db = require("../models");

const Categories = db.Categories;

exports.findAll = (req, res) => {
    Categories.findAll({ raw: true })
        .then((res1) => {
            res.send(res1);
        })
        .catch((err) => res.send(err));
};

exports.create = (req, res) => {
    Categories.create({ name: req.body.name })
        .then((res1) => {
            // Categories.findByPk(res1.id)
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
    Categories.findByPk(req.params.id)
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
    Categories.update(
        { name: req.body.name },
        {
            where: { id: req.params.id },
        }
    )
        .then((res1) => {
            if (res1[0] !== 0) {
                // Categories.findByPk(req.params.id)
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
    Categories.destroy({
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
