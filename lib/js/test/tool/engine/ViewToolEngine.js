'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var ViewService$Wonderjs = require("wonder.js/lib/js/src/service/record/main/device/ViewService.js");
var OperateSettingService$Wonderjs = require("wonder.js/lib/js/src/service/record/main/setting/OperateSettingService.js");

function setCanvas(canvas, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* viewRecord */8] = ViewService$Wonderjs.setCanvas(canvas, state[/* viewRecord */8]);
  return newrecord;
}

function unsafeGetContext(state) {
  return OperateSettingService$Wonderjs.unsafeGetContext(state[/* settingRecord */0]);
}

exports.setCanvas = setCanvas;
exports.unsafeGetContext = unsafeGetContext;
/* ViewService-Wonderjs Not a pure module */
