const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  filenameHashing: false,
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    host: 'localhost',
    port: 8080, // 端口号
    // https: true, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'http://v.juhe.cn/calendar/day',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('@views', resolve('./src/views'))
      .set('@router', resolve('./src/router'))
  }
}
