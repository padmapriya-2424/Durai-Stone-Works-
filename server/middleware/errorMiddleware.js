function notFoundHandler(request, response) {
  response.status(404).json({
    success: false,
    message: `Route not found: ${request.method} ${request.originalUrl}`,
  })
}

function errorHandler(error, request, response, next) {
  const statusCode = error.statusCode || (error.name === 'ValidationError' ? 400 : 500)
  const payload = {
    success: false,
    message: statusCode === 500 ? 'Internal server error' : error.message,
  }

  if (error.name === 'ValidationError') {
    payload.message = 'Validation failed'
    payload.errors = Object.entries(error.errors).map(([field, detail]) => ({ field, message: detail.message }))
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(error.message)
  }

  response.status(statusCode).json(payload)
}

module.exports = { errorHandler, notFoundHandler }
