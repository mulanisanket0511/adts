let mongoose = require('mongoose')

let raw_data = new mongoose.Schema({
  JSON_data: {
    type: String,
    default: null,
  },
  is_populated:{
    type:Boolean,
    default:false
  }

}, { timestamps: true })

module.exports = mongoose.model('rawdata', raw_data)