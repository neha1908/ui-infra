// matter which part of your file system your library lives in
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const glob = require('glob');
const entryPlus = require('webpack-entry-plus');
const overrides = require('./src/themes/override-ant');

const externalPkg = (pkg, root) => {
  return {
    root: root || pkg,
    commonjs: pkg,
    commonjs2: pkg,
    amd: pkg,
  };
};

const entries = [
  { entryFiles: ['whatwg-fetch'] },
  {
    entryFiles: ['./src'],
    outputName() {
      return 'index';
    },
  },
  {
    entryFiles: glob.sync('./src/components/*'),
    outputName(item) {
      return item.replace('src/components/', '').replace('.js', '');
    },
  },
];

module.exports = {
  entry: entryPlus(entries),
  mode: 'production',
  optimization: {
    minimize: true,
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            modifyVars: {...overrides},
            javascriptEnabled: true,
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
      },
    ],
  },
  performance: {
    hints: 'warning', // enum
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
  },
  resolve: {
    extensions: ['.scss', '.js', '.json', '.png', '.gif', '.jpg'],
  },
  externals: [
    {
      react: externalPkg('react', 'React'),
      'react-dom': externalPkg('react-dom', 'ReactDOM'),
      'styled-components': externalPkg('styled-components', 'styled'),
      polished: externalPkg('polished', 'polished'),
      'prop-types': externalPkg('prop-types', 'Proptypes'),
      'date-fns': externalPkg('date-fns', 'dateFns'),
    },
    nodeExternals(),
  ],
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '',
    filename: '[name].js',
    library: '',
    libraryTarget: 'umd',
  },
};
