const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
// const isProd = true;

module.exports = {
  entry: {
    wd: './lib/es6_global/src/core/Index.js',
  },
  mode: isProd ? 'production' : 'development',
  output: {
    path: path.join(__dirname, "dist"),
    filename: 'index.min.js',
  },
};
