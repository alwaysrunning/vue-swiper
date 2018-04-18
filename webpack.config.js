var path = require('path')
var webpack = require('webpack')

module.exports = {
	entry: {
		app: './src/main.js',
		mock: './mock/index.js'
	},
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js',
		libraryTarget:'umd', 
		library: 'demo'
  },
	module: {
		rules: [
		{
			test: /\.css$/,
			use: [
				'vue-style-loader',
				'css-loader'
			],
		},
		{
			test: /\.scss$/,
			use: [
				'vue-style-loader',
				'css-loader',
				'sass-loader',
				'sass-resources-loader?resources='+path.resolve(__dirname, './src/assets/sass/vars.scss')
			],
		},
		{
			test: /\.sass$/,
			use: [
				'vue-style-loader',
				'css-loader',
				'sass-loader?indentedSyntax'
			],
		},
		{
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			use: ['url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]']
		},
		{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					// Since sass-loader (weirdly) has SCSS as its default parse mode, we map
					// the "scss" and "sass" values for the lang attribute to the right configs here.
					// other preprocessors should work out of the box, no loader config like this necessary.
					'scss': [
						'vue-style-loader',
						'css-loader',
						'sass-loader',
						'sass-resources-loader?resources='+path.resolve(__dirname, './src/assets/sass/vars.scss')
					],
					'sass': [
						'vue-style-loader',
						'css-loader',
						'sass-loader?indentedSyntax'
					]
				}
								 // other vue-loader options go here
			}
		},
		{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		},
		{
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]?[hash]'
			}
		}
		]
	},
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
			'@': path.join(__dirname, './src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
		host: '127.0.0.1',
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {

	module.exports.entry = {
		index: './src/components/index.js',
	}
  module.exports.output = {
    path: path.resolve(__dirname, './lib'),
    publicPath: '/lib/',
    filename: '[name].js',
		libraryTarget:'umd',
		library: 'nav'	
  }
	module.exports.externals = {
		vue : 'vue'
	}
  module.exports.devtool = false;
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
  ])
}
