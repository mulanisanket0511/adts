const express = require("express");
const route = express.Router();
const {addTrack,alltrack} = require("../controller/trackcontroller");
const { verifyAccessToken } = require("../middleware/jwt");

route.post("/add",verifyAccessToken , addTrack);
route.get("/alltrack",verifyAccessToken , alltrack);



module.exports = route
