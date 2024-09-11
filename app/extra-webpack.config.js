// If you update webpack to version 5, you will have to make this work. Also you will need to change angular json to accept a custom builer.
// Follow this tutorial https://www.digitalocean.com/community/tutorials/angular-custom-webpack-config

// const webpack = require('webpack')
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const path = require('path')
//const jsonImporter = require("node-sass-json-importer");

module.exports = {
  // node:{
  //   crypto: true,
  //   path: true,
  //   os:true,
  //   stream: true,
  //   buffer: true
  // }
  resolve: {
      fallback: {
      stream: false,
      crypto: require.resolve("crypto-browserify"),
      assert: require.resolve("assert/"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify"),
      url: false,
      process: require.resolve('process/browser'),
      } 
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.scss$|\.sass$/,
  //       use: [
  //         {
  //           loader: require.resolve("sass-loader"),
  //           options: {
  //             implementation: require("node-sass"),
  //             sassOptions: {
  //               // bootstrap-sass requires a minimum precision of 8
  //               precision: 8,
  //               importer: jsonImporter(),
  //               outputStyle: "expanded",
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // }
  // plugins: [
  //     // fix "process is not defined" error:
  //     // (do "npm install process" before running the build)
  //     new webpack.ProvidePlugin({
  //         process: 'process/browser',
  //     }),
  // ]
  //   plugins: [
	// 	new NodePolyfillPlugin({
	// 		excludeAliases: ["console"]
	// 	})
	// ]
}