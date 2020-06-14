const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    resolve:{
        extensions: ['.css','.js','.html']
    },
    module: {
        rules: [
            {
                test:/\.html$/,
                loader: 'html-loader'
            },
            {
                test:/\.(png|jpg|svg)$/,
                loader: 'file-loader',
                options:{
                    outputPath:'images'
                }
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'./src/template.html',
            filename:'index.html'
        })
    ]
}