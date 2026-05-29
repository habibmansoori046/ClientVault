const authRoutes = require("./routes/authRoutes")
const remarkRoutes = require("./routes/remarkRoutes")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

require("dotenv").config()

const customerRoutes = require("./routes/customerRoutes")


const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/customer", customerRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/remark", remarkRoutes)

mongoose.connect(process.env.MONGO_URI)

.then(() => {
  console.log("MongoDB Connected")
})

.catch((err) => {
  console.log(err)
})

app.get("/", (req, res) => {
  res.send("Backend Running Successfully")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})