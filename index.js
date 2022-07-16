const express = require("express");
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json({ limit: "2mb" }));
const port = 4000;

const pingRouter = require("./ping/ping_router");

app.get("/", (req, res) => {
    res.send("Home page");
});

app.use("/ping", require("./ping/ping_router"));

app.listen(port, () => {
    console.log(`Project listening on port ${port}`);
});
