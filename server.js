const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./app/models/index");
// const DB = require("./app/config/db.config");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/app/media/", express.static("./app/media/"));

db.sequelize
    // .sync()
    .sync({ force: true })
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

require("./app/routes")(app);
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
