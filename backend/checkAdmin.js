const mongoose = require("mongoose")
require("dotenv").config()

const Admin = require("./models/Admin")

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.once("open", async () => {

  const admins = await Admin.find()

  console.log(admins)

  process.exit()

})