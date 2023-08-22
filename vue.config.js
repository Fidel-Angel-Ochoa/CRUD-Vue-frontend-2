const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    entry: "./src/main.js",
  },
  publicPath:
    process.env.NODE_ENV === "production" ? "/crud-cue-frontend-2/" : "/",
  devServer: {
    historyApiFallback: true,
    port: 10000, // Set the desired port number
  },
});
