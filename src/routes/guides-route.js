import express from "express"
import guideController from '../controllers/guides-controller.js'

import bodyParser from 'body-parser'

const router = express.Router()

router.get('/guides', guideController.index)
router.post('/signup', guideController.create)
router.put('/guides/:id', guideController.update)
router.delete('/guides/:id', guideController.destroy)

export default router