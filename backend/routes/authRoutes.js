const express = require("express")

const router = express.Router()

const jwt = require("jsonwebtoken")

const bcrypt = require("bcryptjs")

const Admin = require("../models/Admin")

// LOGIN

router.post("/login", async (req, res) => {

  try {

    const { username, password } = req.body

    const admin = await Admin.findOne({ username })
    console.log("USERNAME:", username)
    console.log("ADMIN FOUND:", admin)

    if (!admin) {

      return res.status(400).json({
        message: "Admin not found"
      })

    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    )

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid password"
      })

    }
    console.log("Entered Password:", password)

    console.log("Hash Password:", admin.password)

    console.log("Password Match:", isMatch)

    const token = jwt.sign(

      {
        id: admin._id
      },

      "SECRET_KEY",

      {
        expiresIn: "7d"
      }

    )

    res.json({
      token,
      admin
    })

  } catch (error) {

    res.status(500).json(error)

  }

})

module.exports = router