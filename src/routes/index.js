import express from "express"
const router = express.Router()

import guideRoutes from './guides-route.js'
import passengerRoutes from './passengers-route.js'

router.use(guideRoutes)
router.use(passengerRoutes)


export default router