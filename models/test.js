let mongoose = require("mongoose")

let test = new mongoose.Schema({
    note: {
        type: String,
        default: null,
    },
    UUID: {
        type: String,
        default: null,
    },
    registration_id: {
         type: mongoose.Schema.Types.ObjectId,
        ref: 'registration'
    },
    track_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'track'
    },
    vehicle_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vehical'
    },
    test_date: {
        type: String,
        default: null,
    },
    kreb_hit: {
        type: Array,
        default: null,
    },
    stoppage: {
        type: Array,
        default: null,
    },
    result:{
        type: String,
        default: null,
    },
    start_time:{
        type: String,
        default: null,
    },
    end_time:{
        type: String,
        default: null,
    },
    avg_speed:{
       type:Number,
       default:null,
    },
    test_duration:{
        type:Number,
        default:null,
     },
     image_data_url:{
        type:String,
        default:null,
     },
     

}, { timestamps: true })


module.exports = mongoose.model("test", test)
