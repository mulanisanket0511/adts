
let mongoose = require("mongoose")

const tag = new mongoose.Schema({
    note:{
        type:String,
        default:null,
    },
    UUID:{
        type:String,
        default:null,
    },
   name:{
        type:String,
        default:null,
    },
    coordinate:{
        type:Object,
        default:null,  
    }
}, {timestamps:true})

module.exports = mongoose.model("tag",tag)