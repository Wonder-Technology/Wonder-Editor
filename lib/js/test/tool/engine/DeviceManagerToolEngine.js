'use strict';

var AllDeviceManagerService$Wonderjs = require("wonder.js/lib/js/src/service/record/all/device/AllDeviceManagerService.js");

function getGl(state) {
  return AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]);
}

exports.getGl = getGl;
/* AllDeviceManagerService-Wonderjs Not a pure module */
