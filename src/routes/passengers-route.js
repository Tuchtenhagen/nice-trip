import express from "express"

const router = express.Router()

router.get('/passengers', (req, res) => {
  res.send({teste: "passengers"})
})

export default router