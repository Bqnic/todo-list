const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    module: {
        rules: [
          {
            test: /\.css$/,
            use: ["style-loader","css-loader"],
          },
        ],
      },
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
      },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'TODO list',
        filename: 'index.html',
        template: 'src/template.html',
    }),
  ],
};