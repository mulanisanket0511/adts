let mongoose = require("mongoose")

let track = new mongoose.Schema({
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
    JSON_data:{
        type:Array,
        default:null,
    },
    application_id:{
        type:Number,
        default:null,
    },
    tag1:{
        type:Number,
        default:null,
    },
    tag2:{
        type:Number,
        default:null,
    },
    tag3:{
        type:Number,
        default:null,
    },
    tag4:{
        type:Number,
        default:null,
    },
    tag5:{
        type:Number,
        default:null,
    },
    tag6:{
        type:Number,
        default:null,
    },
    tag7:{
        type:Number,
        default:null,
    },
    tag8:{
        type:Number,
        default:null,
    },
    tag9:{
        type:Number,
        default:null,
    },
    tag10:{
        type:Number,
        default:null,
    },
    test_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'test'
    },
}, { timestamps: true })


module.exports = mongoose.model("track",track)

