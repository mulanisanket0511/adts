const jwt = require("jsonwebtoken");
const logger = require("./logger");
const { requireJsonContent } = require("./reqdispatcher");
module.exports = {
 
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"])
      return res.json({ message: "Access Denied" });
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    if(token === process.env.TOKEN){
      next();
    }
    else{
      logger.errorLog.error("token error")
      return res.json({ message: "Access Denied" })
    }
   
  },
};