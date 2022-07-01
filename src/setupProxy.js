const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/v1",
    createProxyMiddleware({
      target: "https://api.bitfinex.com/",
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    "/v2/platform/status",
    createProxyMiddleware({
      target: "https://api-pub.bitfinex.com",
      secure: false,
      changeOrigin: true,
    })
  );
};
