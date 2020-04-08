const { createProxyMiddleware } = require('http-proxy-middleware')

console.log(`PORT given to client: ${process.env.PORT}`)

module.exports = app => {
  //Sends proxy request to http://localhost:6000/*
  app.use('/server/*', createProxyMiddleware({ target: `http://localhost:6000`, changeOrigin: true }))
};