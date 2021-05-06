'use strict';

var Caml_obj = require("bs-platform/lib/js/caml_obj.js");

var isEqual = Caml_obj.caml_equal;

var isNotEqual = Caml_obj.caml_notequal;

function isSame(a, b) {
  return a === b;
}

exports.isEqual = isEqual;
exports.isNotEqual = isNotEqual;
exports.isSame = isSame;
/* No side effect */
