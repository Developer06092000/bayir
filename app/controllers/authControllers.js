const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/db.config");

const Users = db.Users;

let salt = bcrypt.genSaltSync(config.genSalt).valueOf();
let password = bcrypt.hashSync("Jm06092000", salt).valueOf();
let user = {
    username: "admin01",
    password: password,
};
Users.create(user)
    .then((res1) => {
        console.log("admin01 created");
    })
    .catch((err) => {
        console.log(err);
    });

exports.login = (req, res) => {
    console.log(req.body);
    Users.findOne({ where: { username: req.body.username } })
        .then((res1) => {
            if (res1) {
                if (bcrypt.compareSync(req.body.password, res1.password).valueOf()) {
                    let user = {
                        id: res1.id,
                        username: res1.username,
                    };
                    jwt.sign(user, config.tokenKey, { expiresIn: "4h" }, (err, token) => {
                        if (err) res.send(err);
                        res.send({ token: token });
                    });
                } else {
                    res.send("Incorrect password!");
                }
            } else {
                res.send("Incorrect username");
            }
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.create = (req, res) => {
    let tokenHeader = req.headers["authorization"];
    if (tokenHeader) {
        let token = tokenHeader.split(" ");
        jwt.verify(token[1], config.tokenKey, (err, auth) => {
            if (auth.username === "admin01" && token[0] === "hacker") {
                Users.findOne({ where: { username: req.body.username } })
                    .then((res1) => {
                        if (!res1 && req) {
                            if (req.body.password.length >= 8) {
                                let salt = bcrypt.genSaltSync(config.genSalt).valueOf();
                                let password = bcrypt.hashSync(req.body.password, salt).valueOf();
                                let user = {
                                    username: req.body.username,
                                    password: password,
                                };
                                Users.create(user)
                                    .then((res1) => {
                                        res.send({ status: true });
                                    })
                                    .catch((err) => {
                                        res.send(err);
                                    });
                            } else {
                                res.send({ status: false, message: "Short password!" });
                            }
                        } else {
                            res.send("This username already exists!");
                        }
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            } else {
                res.sendStatus(401);
            }
        });
    }
};

exports.update = (req, res) => {
    let tokenHeader = req.headers["authorization"];
    if (tokenHeader) {
        let token = tokenHeader.split(" ")[1];
        jwt.verify(token, config.tokenKey, (err, auth) => {
            if (err) res.send(err);
            let salt = bcrypt.genSaltSync(config.genSalt).valueOf();
            let password = bcrypt.hashSync(req.body.password, salt).valueOf();
            Users.update(
                { password: password },
                {
                    where: { username: auth.username },
                }
            )
                .then((res1) => {
                    if (res1[0] !== 0) {
                        res.send("Password changed!");
                    } else {
                        res.send("Password not changed!");
                    }
                })
                .catch((err) => {
                    res.send(err);
                });
        });
    } else {
        res.sendStatus(403);
    }
};

exports.delete = (req, res) => {
    let tokenHeader = req.headers["authorization"];
    if (tokenHeader) {
        let token = tokenHeader.split(" ")[1];
        jwt.verify(token, config.tokenKey, (err, auth) => {
            if (err) res.send(err);
            if (auth.username === "admin01") {
                Users.destroy({
                    where: { username: req.body.username },
                })
                    .then((res1) => {
                        if (res1) {
                            res.send("Has been deleted!");
                        } else {
                            res.send("Not found");
                        }
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            } else {
                res.sendStatus(401);
            }
        });
    }
};
