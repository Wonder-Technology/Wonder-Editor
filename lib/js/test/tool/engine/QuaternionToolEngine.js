'use strict';

var QuaternionService$Wonderjs = require("wonder.js/lib/js/src/service/atom/QuaternionService.js");

var setFromEulerAngles = QuaternionService$Wonderjs.setFromEulerAngles;

var getEulerAngles = QuaternionService$Wonderjs.getEulerAngles;

exports.setFromEulerAngles = setFromEulerAngles;
exports.getEulerAngles = getEulerAngles;
/* No side effect */
