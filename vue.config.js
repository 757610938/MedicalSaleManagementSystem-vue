module.exports = {
  configureWebpack: {
    devServer: {
      host: 'localhost', //要设置当前访问的ip 否则失效
      port: 8081,//当前web服务端口
      open: false, //浏览器自动打开页面
      proxy: {
        '/apis': {
          target: 'http://127.0.0.1:8080/medicalSaleManagementSystem_war_exploded',//目标地址
          ws: true,//是否代理websocket
          changeOrigin: true,//是否跨域
          pathRewrite: {
            '^/apis': ''//url重写
          }
        }
      }
    }
  }
}
