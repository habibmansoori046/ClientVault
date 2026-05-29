const authMiddleware = require("../middleware/authMiddleware")
const express = require("express")

const router = express.Router()

const Customer = require("../models/Customer")

// CREATE CUSTOMER

router.post("/create", authMiddleware,, async (req, res) => {

  try {

    const customer = await Customer.create(req.body)

    res.json(customer)

  } catch (error) {

    res.status(500).json(error)

  }

})

// GET ACTIVE CUSTOMERS

router.get("/all", authMiddleware, async (req, res) => {

  try {

    const customers = await Customer.find({
      isDeleted: false
    })

    res.json(customers)

  } catch (error) {

    res.status(500).json(error)

  }

})

// GET DELETED CUSTOMERS

router.get("/deleted/all", async (req, res) => {

  try {

    const customers = await Customer.find({
      isDeleted: true
    })

    res.json(customers)

  } catch (error) {

    res.status(500).json(error)

  }

})

// UPDATE CUSTOMER

router.put("/update/:id", async (req, res) => {

  try {

    const updatedCustomer = await Customer.findByIdAndUpdate(

      req.params.id,

      req.body,

      { new: true }

    )

    res.json(updatedCustomer)

  } catch (error) {

    res.status(500).json(error)

  }

})

// SOFT DELETE CUSTOMER

router.put("/delete/:id", async (req, res) => {

  try {

    const customer = await Customer.findByIdAndUpdate(

      req.params.id,

      {
        isDeleted: true
      },

      { new: true }

    )

    res.json(customer)

  } catch (error) {

    res.status(500).json(error)

  }

})

// RESTORE CUSTOMER

router.put("/restore/:id", async (req, res) => {

  try {

    const customer = await Customer.findByIdAndUpdate(

      req.params.id,

      {
        isDeleted: false
      },

      { new: true }

    )

    res.json(customer)

  } catch (error) {

    res.status(500).json(error)

  }

})

// PERMANENT DELETE

router.delete("/permanent/:id", async (req, res) => {

  try {

    await Customer.findByIdAndDelete(req.params.id)

    res.json({
      message: "Customer Permanently Deleted"
    })

  } catch (error) {

    res.status(500).json(error)

  }

})

// GET SINGLE CUSTOMER

router.get("/:id", async (req, res) => {

  try {

    const customer = await Customer.findById(req.params.id)

    res.json(customer)

  } catch (error) {

    res.status(500).json(error)

  }

})

module.exports = router