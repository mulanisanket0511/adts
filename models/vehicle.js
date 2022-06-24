let mongoose = require("mongoose")

let vehicle = new mongoose.Schema({
    note:{
        type:String,
        default:null,
    },
    UUID:{
        type:String,
        default:null,
    },
    registration_number:{
        type:Number,
        default:null,
    },
    registration_year:{
        type:String,
        default:null,
    },
    Tag_ID:{
        type:Array,
        default:10,
    }
}, { timestamps: true })         


module.exports = mongoose.model("vehicle",vehicle)
