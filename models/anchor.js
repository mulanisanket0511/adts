let mongoose = require("mongoose")

const anchor = mongoose.Schema({
     note:{
         type:String,
         default:null,
     }, 
     position:{
         type:Object,
         default:null,
     }
},{ timestamps: true })


module.exports = mongoose.model("anchor", anchor)