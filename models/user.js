let mongoose = require('mongoose')

let user = mongoose.Schema({
    note:{
        type:String,
        default:null,
    },
    first_name:{
        type:String,
        default:null,
    },
    last_name:{
        type:String,
        default:null,
    },
    email:{
        type:String,
        default:null,
    },
    phone:{
        type:Number,
        default:null,
    },
    password:{
        type:String,
        default:null,
    },
    is_operator:{
        type:Boolean,
        default:false,
    },
    remeber_token:{
        type:String,
        default:null,
    },
    email_verified_at:{
        type:String,
        default:null,
    },

    
}, { timestamps: true })

module.exports = mongoose.model("user", user)