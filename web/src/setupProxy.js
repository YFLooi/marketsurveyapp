const { createProxyMiddleware } = require('http-proxy-middleware')

console.log(`PORT given to client: ${process.env.PORT}`)

module.exports = app => {
  //Sends proxy request to http://localhost:6000/api/*
  app.use('/api', createProxyMiddleware({ target: `http://localhost:6000/`, changeOrigin: true }))
};