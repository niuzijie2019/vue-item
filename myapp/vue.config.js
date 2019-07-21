module.exports = {
  devServer: {
    // proxy: 'https://dsapi.beibei.com'
    proxy: {
      '/api': {
        target: 'http://10.11.56.6:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
