const express = require("express")
const app = express()
const cors = require('cors')
require("dotenv").config()
const port = process.env.PORT
var bodyParser = require('body-parser')
const dbconnection = require("./config/db")
const { mqqt_microservices } = require('./controller/microservice')
const testRouter = require('./router/test_router')
const trackRouter = require('./router/track_router')
const commonroute = require('./router/common_route') 
const logger  = require("./middleware/logger")
const requireJsonContent = require("./middleware/reqdispatcher")



app.use(cors())
mqqt_microservices()


app.use(requireJsonContent())

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
dbconnection()
app.get("/", (req, res) => {
    res.send("Hello World")
});


app.use("/test", testRouter)
app.use("/track", trackRouter)
app.use("/common",commonroute)


app.listen(port, () => {
    logger.accessLog.info(`Example app listening at http://localhost:${port}`)

})






