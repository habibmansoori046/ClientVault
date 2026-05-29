const mongoose = require("mongoose")

const remarkSchema = new mongoose.Schema({

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  },

  text: {
    type: String,
    required: true
  }

}, { timestamps: true })

module.exports = mongoose.model("Remark", remarkSchema)