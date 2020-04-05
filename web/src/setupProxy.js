const { createProxyMiddleware } = require('http-proxy-middleware')

console.log(`PORT given to client: ${process.env.PORT}`)

module.exports = app => {
  app.use('/api/*', createProxyMiddleware({ target: `http://localhost:80/`, changeOrigin: true }))
};

/**
  if (process.env.PORT === 80){
    
  } else {
    app.use('/api/*', createProxyMiddleware({ target: `http://localhost:${process.env.PORT}/`, changeOrigin: true }))
  }
 */