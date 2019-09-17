const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('style.css')
    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/, // (regex) - only runs babel-loader on  files ending in .js
                exclude: /node_modules/ // don't run babel on node modules bc they're already processed
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                       {
                           loader: 'css-loader',
                           options: {
                               sourceMap: true
                           }
                       },
                       {
                           loader: 'sass-loader',
                           options: {
                               sourceMap: true
                           }
                       }
                    ]
                })
            }, {
                test: /\.(jpeg|jpg|png|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            },  {
                test: /\.csv$/,
                loader: 'csv-loader',
                options: {
                  dynamicTyping: true,
                  header: true,
                  skipEmptyLines: true
                }
            }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        },
        node: {
            fs: 'empty'
          }
    }
}
