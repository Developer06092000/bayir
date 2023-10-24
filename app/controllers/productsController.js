const db = require("../models");
const fs = require("fs");

const Products = db.Products;
const Images = db.Images;

exports.findAll = (req, res) => {
    Products.findAll({ raw: true })
        .then((res1) => {
            res1.map((item, key) => {
                let data = [];
                Images.findAll({ where: { product: item.id } }).then((res2) => {
                    let data1 = item;
                    data1.img_list = res2.map((item1) => item1);
                    data.push(data1);
                    if (key === res1.length - 1) {
                        res.send(data);
                    }
                });
            });
        })
        .catch((err) => res.send(err));
};

exports.create = (req, res) => {
    Products.create({
        name: req.body.name,
        title: req.body.title,
        img: req.files && req.files.img && req.files.img[0].path,
        price_old: req.body.price_old,
        price_new: req.body.price_new,
        sale: req.body.sale,
        size: req.body.size,
        subtitle: req.body.subtitle,
        description: req.body.description,
        type: req.body.type,
        mebel: req.body.mebel,
    })
        .then((res1) => {
            req.files &&
                req.files.img_list &&
                req.files.img_list.forEach((item) => Images.create({ path: item.path, product: res1.id }));
            res.send({ status: true });
        })
        .catch((err) => {
            req.files &&
                req.files.img_list &&
                req.files.img_list.forEach((path) => fs.existsSync(path) && fs.unlinkSync(path));
            res.send(err);
        });
};

exports.findOne = (req, res) => {
    Products.findByPk(req.params.id)
        .then((res1) => {
            if (res1) {
                Images.findAll({ where: { product: res1.id } }).then((res2) => {
                    let data = res1.dataValues;
                    data.img_list = res2.map((item) => item);
                    res.send(data);
                });
            } else {
                res.send("Not found");
            }
        })
        .catch((err) => res.send(err));
};

exports.update = (req, res) => {
    Products.update(
        {
            name: req.body.name,
            title: req.body.title,
            img: req.files && req.files.img && req.files.img[0].path,
            price_old: req.body.price_old,
            price_new: req.body.price_new,
            sale: req.body.sale,
            size: req.body.size,
            subtitle: req.body.subtitle,
            description: req.body.description,
            type: req.body.type,
            mebel: req.body.mebel,
        },
        {
            where: { id: req.params.id },
        }
    )
        .then((res1) => {
            if (res1[0] !== 0) {
                req.files &&
                    req.files.img_list &&
                    req.files.img_list.forEach((item) => Images.create({ path: item.path, product: res1.id }));
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
