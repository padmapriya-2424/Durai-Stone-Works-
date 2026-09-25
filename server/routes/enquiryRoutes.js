const express = require('express')
const rateLimit = require('express-rate-limit')
const { createEnquiry } = require('../controllers/enquiryController')

const router = express.Router()
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, message: 'Too many enquiries submitted. Please try again later.' },
})

router.post('/', enquiryLimiter, createEnquiry)

module.exports = router
