let mongoose = require("mongoose")

let registration = new mongoose.Schema({
    note:{
        type:String,
        default:null,
    },
    UUID:{
        type:String,
        default:null,
    },
    application_id:{
        type:Number,
        default:null,
    },
    registration_date:{
        type:String,
        default:null,
    },
    appointment_no:{
        type:Number,
        default:null,
    },
    applicant_Photo:{
        type:String,
        default:null,
    },
    name:{
        type:String,
        default:null,
    },
    date_of_birth:{
        type:String,
        default:null,
    },
    gender:{
        type:String,
        default:null,
    }, 
    fees_amount:{
        type:Number,
        default:null,
    }, 
    remark:{
        type:String,
        default:null,
    },
    contact_no :{
        type:Number,
        default:null,
    },
    aadhaar_no:{
        type:Number,
        default:null,
    },
    address:{
        type:String,
        default:null,
    },
   

},{ timestamps: true })


module.exports = mongoose.model("registration",registration)

