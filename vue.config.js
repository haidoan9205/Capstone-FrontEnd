const webpack = require("webpack");

module.exports = {
  configureWebpack: {
    // devServer: {
    //   host: "0.0.0.0",
    //   port: 8080,
    //   proxy:'http://0.0.0.0:8080'
    // },
    // Set up all the aliases we use in our app.
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6,
      }),
    ],
  },
  pwa: {
    name: "Imago",
    themeColor: "#172b4d",
    msTileColor: "#172b4d",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#172b4d",
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== "production",
  },
};
