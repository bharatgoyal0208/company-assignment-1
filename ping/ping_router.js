const express = require("express");

const pingController = require("./ping_controller");

const pingRouter = express.Router();

pingRouter.post("/ping", pingController.ping);

pingRouter.get("/", (req, res) => {
    res.send("Ping test");
});

module.exports = pingRouter;
