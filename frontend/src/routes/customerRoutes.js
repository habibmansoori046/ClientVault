const express = require("express")

const router = express.Router()

const Customer = require("../models/Customer")

// CREATE CUSTOMER

router.post("/create", async (req, res) => {

  try {

    const customer = await Customer.create(req.body)

    res.json(customer)

  } catch (error) {

    res.status(500).json(error)

  }

})

// GET ALL CUSTOMERS

router.get("/all", async (req, res) => {

  try {

    const customers = await Customer.find()

    res.json(customers)

  } catch (error) {

    res.status(500).json(error)

  }

})

module.exports = router