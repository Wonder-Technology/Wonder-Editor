'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Js_null_undefined = require("bs-platform/lib/js/js_null_undefined.js");
var ArrayService$Wonderjs = require("wonder.js/lib/js/src/service/atom/ArrayService.js");
var ScriptEngineService$WonderEditor = require("../../../src/service/state/engine/script/ScriptEngineService.js");
var OperateScriptDataMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/script/OperateScriptDataMainService.js");
var ImmutableHashMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ImmutableHashMapService.js");
var ScriptAttributeEngineService$WonderEditor = require("../../../src/service/state/engine/script/ScriptAttributeEngineService.js");
var ScriptEventFunctionEngineService$WonderEditor = require("../../../src/service/state/engine/script/ScriptEventFunctionEngineService.js");

function getScriptAttributeEntries(script, attributeName, engineState) {
  return ScriptAttributeEngineService$WonderEditor.getScriptAttributeEntries(ScriptEngineService$WonderEditor.unsafeGetScriptAttribute(script, attributeName, engineState));
}

function getScriptAttributeFieldNames(script, attributeName, engineState) {
  return getScriptAttributeEntries(script, attributeName, engineState).map((function (param) {
                return param[0];
              }));
}

function unsafeGetScriptEventFunctionData(script, eventFunctionName, engineState) {
  return ImmutableHashMapService$WonderCommonlib.unsafeGet(eventFunctionName, OperateScriptDataMainService$Wonderjs.unsafeGetScriptAllEventFunctionData(script, engineState));
}

function getScriptFirstEventFunctionNameAndData(script, engineState) {
  return ArrayService$Wonderjs.unsafeGetFirst(ScriptEngineService$WonderEditor.getScriptAllEventFunctionEntries(script, engineState));
}

function buildEventFunctionJsObj($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var initFunc = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  var updateFunc = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : undefined;
  var disposeFunc = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : undefined;
  return {
          init: Js_null_undefined.fromOption(initFunc),
          update: Js_null_undefined.fromOption(updateFunc),
          dispose: Js_null_undefined.fromOption(disposeFunc)
        };
}

function buildScriptEventFunctionData(initFunc, updateFunc, disposeFunc) {
  return ScriptEventFunctionEngineService$WonderEditor.createScriptEventFunctionData(buildEventFunctionJsObj(Caml_option.some(initFunc), Caml_option.some(updateFunc), Caml_option.some(disposeFunc), /* () */0));
}

function buildSetLocalPositionEventFunc(param) {
  return (function (script, api, engineState) {
      var unsafeGetScriptGameObject = api.unsafeGetScriptGameObject;
      var unsafeGetGameObjectTransformComponent = api.unsafeGetGameObjectTransformComponent;
      var getTransformLocalPosition = api.getTransformLocalPosition;
      var setTransformLocalPosition = api.setTransformLocalPosition;
      var transform = unsafeGetGameObjectTransformComponent(unsafeGetScriptGameObject(script, engineState), engineState);
      var match = getTransformLocalPosition(transform, engineState);
      return setTransformLocalPosition(transform, /* tuple */[
                  match[0] + 10,
                  match[1],
                  match[2]
                ], engineState);
    });
}

function createIntFieldValue(value) {
  return value;
}

function getAttributeFieldADefaultValue(param) {
  return 1;
}

function buildScriptAttribute(scriptAttributeName) {
  var scriptAttribute = ScriptAttributeEngineService$WonderEditor.createScriptAttribute(/* () */0);
  return ScriptAttributeEngineService$WonderEditor.addScriptAttributeFieldJsObj("a", {
              type: "int",
              defaultValue: 1
            }, scriptAttribute);
}

exports.getScriptAttributeEntries = getScriptAttributeEntries;
exports.getScriptAttributeFieldNames = getScriptAttributeFieldNames;
exports.unsafeGetScriptEventFunctionData = unsafeGetScriptEventFunctionData;
exports.getScriptFirstEventFunctionNameAndData = getScriptFirstEventFunctionNameAndData;
exports.buildEventFunctionJsObj = buildEventFunctionJsObj;
exports.buildScriptEventFunctionData = buildScriptEventFunctionData;
exports.buildSetLocalPositionEventFunc = buildSetLocalPositionEventFunc;
exports.createIntFieldValue = createIntFieldValue;
exports.getAttributeFieldADefaultValue = getAttributeFieldADefaultValue;
exports.buildScriptAttribute = buildScriptAttribute;
/* ArrayService-Wonderjs Not a pure module */
