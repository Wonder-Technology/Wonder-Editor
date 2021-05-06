'use strict';

var FloatService$WonderEditor = require("../../src/service/atom/FloatService.js");

function truncate(digit, array) {
  return array.map((function (value) {
                return FloatService$WonderEditor.truncateFloatValue(value, digit);
              }));
}

exports.truncate = truncate;
/* No side effect */
