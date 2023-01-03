const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        // {
        //   from: 'src/assets/images/flags-svg',
        //   to: 'assets/images/flags-svg',
        //   force: true
        // },
         {
          from: '**/*.json',
          to: '',
          context: "src/",
          force: true
        },
      ]
    })
  ],
  mode: 'development'
}
