const { createProxyMiddleware } = require('http-proxy-middleware')

console.log(`process.env.port is: ${process.env.PORT}`)

module.exports = app => {
  if (process.env.PORT === 80){
    app.use('/api/*', createProxyMiddleware({ target: `http://localhost:80/`, changeOrigin: true }))
  } else {
    app.use('/api/*', createProxyMiddleware({ target: `http://localhost:${process.env.PORT}/`, changeOrigin: true }))
  }
};

