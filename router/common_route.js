const express = require("express");
const route = express.Router();

 const {addregistration,adduser,populateData, PopulateById,allpopulatejsondata,resultData} = require("../controller/commoncontroller");
const { verifyAccessToken } = require("../middleware/jwt");

route.post("/registration", verifyAccessToken ,addregistration );
route.post("/user",verifyAccessToken ,adduser );
route.post("/populate",verifyAccessToken , populateData)
route.get("/populate/:id",verifyAccessToken,PopulateById)
route.post("/allpopulate",verifyAccessToken,allpopulatejsondata)
route.get("/result-data/:id",verifyAccessToken,resultData)






module.exports = route