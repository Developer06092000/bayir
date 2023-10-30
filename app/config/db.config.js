require("dotenv").config();

module.exports = {
    // HOST: "dpg-chovkhik728ivvv37c3g-a",
    // PORT: 5432,
    // USER: "developer0609",
    // PASSWORD: "WiPanPNf0pIVzwue7xx62CUhT1T3LqCT",
    // DB: "cartogo",
    // dialect: "postgresql",
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    dialect: process.env.dialect,
    genSalt: +process.env.genSalt,
    verifyKey: process.env.verifyKey,
    tokenKey: process.env.tokenKey,
};
