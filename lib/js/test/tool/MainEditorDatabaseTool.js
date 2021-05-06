'use strict';

var MutableHashMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableHashMapService.js");

function buildFakeLocalStorage(param) {
  var fakeLocalStorage = MutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
  global._localStorage = fakeLocalStorage;
  return /* () */0;
}

function getExtensionTestKey(param) {
  return "databaseTest";
}

exports.buildFakeLocalStorage = buildFakeLocalStorage;
exports.getExtensionTestKey = getExtensionTestKey;
/* No side effect */
