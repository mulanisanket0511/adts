var mongoose = require('mongoose');
require("dotenv").config()

const dbconnection = () =>{
mongoose.connect(process.env.MONGO_URL,
     {useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((res) =>{
        console.log("connection succesfully");
    }).catch((err) =>{
        console.log("error");
    })

}
 module.exports = dbconnection
