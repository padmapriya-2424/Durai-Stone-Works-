const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const { errorHandler, notFoundHandler } = require('./middleware/errorMiddleware')
const enquiryRoutes = require('./routes/enquiryRoutes')
const productRoutes = require('./routes/productRoutes')

const app = express()
const port = Number(process.env.PORT) || 5000
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'

app.use(cors({ origin: clientUrl }))
app.use(express.json({ limit: '100kb' }))

app.get('/api/health', (request, response) => {
  const connectionStates = ['disconnected', 'connected', 'connecting', 'disconnecting']
  const database = connectionStates[mongoose.connection.readyState] || 'unknown'

  response.json({
    success: true,
    message: 'Durai Stone Works API is running',
    database,
  })
})

app.use('/api/products', productRoutes)
app.use('/api/enquiries', enquiryRoutes)
app.use(notFoundHandler)
app.use(errorHandler)

async function startServer() {
  try {
    await connectDB()
    app.listen(port, () => {
      console.log(`Durai Stone Works API listening on port ${port}`)
    })
  } catch (error) {
    console.error(`Database startup error: ${error.message}`)
    console.error('Server startup aborted because the database is unavailable')
    process.exitCode = 1
  }
}

if (require.main === module) {
  startServer()
}

module.exports = { app, startServer }
