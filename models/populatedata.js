let mongoose = require('mongoose')

let populate_data = new mongoose.Schema({
  note: {
    type: String,
    default: null,
  },
  application_id: {
    type: String,
    default: null,
  },
  tagId: {
    type: String,
    default: null,
  },
  Coordinate: {
    type: Object,
    default: null,
  },
  timeStamp: {
    type: String,
    default: null,
  },
  massage: {
    type: String,
    default: null,
  },
  stoppage:{
    type:Boolean,
    default:false,
  }
}, { timestamps: true })

module.exports = mongoose.model('populatedata', populate_data)

