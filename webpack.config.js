const path = require('path');
module.exports = {
    entry: './src/index.tsx',
    resolve: {
      extensions: ['.tsx', '.css']
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.min.js'
    },
    module: {
      rules: [
        { 
          test: /\.tsx?$/, 
          loader: 'awesome-typescript-loader'
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
      ]
    }
}
