const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
	devtool: 'inline-source-map',
  entry: './frontend/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
	devServer: {
		hot: true,
		inline: true,
		watchOptions: {
			poll: true,
		},
		contentBase: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './dist/index.html',
			favicon: './assets/logo.ico',
      title: 'IWI',
    }),
		new Dotenv(),
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(jpeg|jpg|png|gif|svg|ico	)$/i, 
				loader: 'file-loader',
			},
		],
	},
};
