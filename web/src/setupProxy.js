const { createProxyMiddleware } = require('http-proxy-middleware')

console.log(`PORT given to client: ${process.env.PORT}`)

module.exports = app => {
  app.use('/api/*', createProxyMiddleware({ target: `http://localhost:80/`, changeOrigin: true }))
};