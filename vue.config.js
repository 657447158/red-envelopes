module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "~@/assets/styles/global.scss";`
            }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: []
        }
    },
    devServer: {
        proxy: {
            '/api': {
                changeOrigin: true,
                target: 'http://129.211.29.207:8091/app/index',
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
