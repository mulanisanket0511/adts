const express = require("express");
const route = express.Router();
const { verifyAccessToken } = require("../middleware/jwt");

 const {endtest} = require("../controller/testcontroller");


route.post("/end" ,verifyAccessToken, endtest);


module.exports = route
