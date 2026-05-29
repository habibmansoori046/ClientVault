const express = require("express")

const router = express.Router()

const Remark = require("../models/Remark")

router.post("/add", async (req, res) => {

  try {

    const remark = await Remark.create(req.body)

    res.json(remark)

  } catch (error) {

    res.status(500).json(error)

  }

})

router.get("/:customerId", async (req, res) => {

  try {

    const remarks = await Remark.find({
      customerId: req.params.customerId
    })

    res.json(remarks)

  } catch (error) {

    res.status(500).json(error)

  }

})

module.exports = router