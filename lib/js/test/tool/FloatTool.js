'use strict';

var FloatService$WonderEditor = require("../../src/service/atom/FloatService.js");

function truncateFloatValue(value) {
  return FloatService$WonderEditor.truncateFloatValue(value, 3);
}

exports.truncateFloatValue = truncateFloatValue;
/* No side effect */
