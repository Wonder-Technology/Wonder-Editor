const path = require('path');

module.exports = {
  entry: {
    wd: './lib/es6_global/src/Index.js',
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: 'index.js',
  },
};
