module.exports = {
    chainWebpack: config => {
        config.module
          .rule('md')
          .test(/\.md$/)
          .use('vue-loader')
          .loader('vue-loader')
          .end()
          .use('vue-markdown-loader')
          .loader('vue-markdown-loader/lib/markdown-compiler')
          .options({
            raw: true
          })
    },
    devServer: {
        port:9002,

        proxy: {
            '/api': {    // search为转发路径
                target: 'http://localhost:9000',  // 后端地址
                ws: true, // 是否代理websockets
                changeOrigin: true ,  // 设置同源  默认false，是否需要改变原始主机头为目标URL,
                pathRewrite: {
                    '^/api': ''   // 把 '/api/user' 替换为 '/user'
                }
            }

        }



    },
    runtimeCompiler: true
};
