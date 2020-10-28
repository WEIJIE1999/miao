module.exports = {
  publicPath: '/miaomiao',
  devServer: {
    open: true,
    proxy: {
      '/api2': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    externals: {
      BMap: 'BMap'
    }
  }
}
