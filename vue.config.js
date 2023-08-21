const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    entry: "./src/main.js",
  },
  devServer: {
    port: 10000, // Set the desired port number
  },
});
