const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { 
    alias: { 
        'react': path.resolve(__dirname, './node_modules/react') ,
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        'assets': path.resolve(__dirname, 'assets')
    } 
  },
  externals: {
    react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "React",
        root: "React"
    },
    "react-dom": {
        commonjs: "react-dom",
        commonjs2: "react-dom",
        amd: "ReactDOM",
        root: "ReactDOM"
    }
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    clean: true,
  },
  mode: 'development',
};