'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Log$WonderLog = require("wonder-log/lib/js/src/Log.js");
var AppStore$WonderEditor = require("../../../src/core/ui/store/AppStore.js");
var LogUtils$WonderEditor = require("../../../src/core/utils/console/LogUtils.js");
var SinonTool$WonderEditor = require("../SinonTool.js");

function getUpdateState(reducerResult) {
  if (typeof reducerResult === "number") {
    return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("", "", "", ""));
  } else if (reducerResult.tag) {
    return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("", "", "", ""));
  } else {
    return reducerResult[0];
  }
}

function isNoUpdate(reducerResult) {
  if (typeof reducerResult === "number") {
    return true;
  } else {
    return false;
  }
}

function createDispatchFuncStub(sandbox) {
  var stub = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
  window.dispathFuncStub_wonder_editor = stub;
  return stub;
}

function buildFakeSelf(state, send) {
  return /* record */[
          /* handle */-1,
          /* state */state,
          /* retainedProps */-1,
          /* send */send,
          /* onUnmount */-1
        ];
}

function getDispatchUpdateActionArr(dispatchedAction) {
  if (dispatchedAction[0] === AppStore$WonderEditor.UpdateAction) {
    return dispatchedAction[1][0];
  } else {
    return /* array */[];
  }
}

exports.getUpdateState = getUpdateState;
exports.isNoUpdate = isNoUpdate;
exports.createDispatchFuncStub = createDispatchFuncStub;
exports.buildFakeSelf = buildFakeSelf;
exports.getDispatchUpdateActionArr = getDispatchUpdateActionArr;
/* Log-WonderLog Not a pure module */
