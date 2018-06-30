// var webpack = require('webpack');
var path = require('path')
var HtmlwebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: __dirname+'/javascripts/main.js',
  //入口文件
  output: {
    filename: 'app.js',
    path:__dirname+'/dist',
  },
  devServer: {
    contentBase: path.join(__dirname),
    // inline:true, 
    port:8080,
    open:true 
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.(scss|sass)$/, 
        loader: "style-loader!css-loader!sass-loader" 
      },
      {
      //   test: /\.scss$/,
      // loader: ExtractTextPlugin.extract("style", 'css!sass')
      //   use: ExtractTextPlugin.extract(
      //     {
      //       fallback:'css-loader',
      //       use:['style-loader','css-loader','sass-loader']   
      //     })//样式分离
      }

      
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
        title: 'server dev index',
        template:"index.html" //指定模板
    })//在dist目录下自动生成index.html，指定其title
    ,
//     new ExtractTextPlugin({
//       filename : "dist/style.css"
//     })//提取出来的样式放在style.css文件中
  ],
}