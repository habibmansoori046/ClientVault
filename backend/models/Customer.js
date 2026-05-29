const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  uin: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  isDeleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true })

module.exports = mongoose.model("Customer", customerSchema)