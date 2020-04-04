//Used only in development
//Bypasses need to define proxy in package.json
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy(["/api", , "/otherApi"], { target: "http://localhost:6000" })
  );
};
