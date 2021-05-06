'use strict';

var ScriptToolEngine$WonderEditor = require("../../../../../../tool/engine/ScriptToolEngine.js");
var ScriptEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/script/ScriptEngineService.js");
var ScriptAttributeEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/script/ScriptAttributeEngineService.js");

var unsafeGetScriptAttributeFieldDefaultValue = ScriptEngineService$WonderEditor.unsafeGetScriptAttributeFieldDefaultValue;

function getScriptAttributeFieldType(script, scriptAttributeName, fieldName, engineState) {
  return ScriptAttributeEngineService$WonderEditor.unsafeGetScriptAttributeFieldType(fieldName, ScriptEngineService$WonderEditor.unsafeGetScriptAttribute(script, scriptAttributeName, engineState));
}

function buildFloatValue(value) {
  return value;
}

function buildIntValue(value) {
  return value;
}

function getScriptAttributeFieldCount(script, attributeName, engineState) {
  return ScriptToolEngine$WonderEditor.getScriptAttributeEntries(script, attributeName, engineState).length;
}

exports.unsafeGetScriptAttributeFieldDefaultValue = unsafeGetScriptAttributeFieldDefaultValue;
exports.getScriptAttributeFieldType = getScriptAttributeFieldType;
exports.buildFloatValue = buildFloatValue;
exports.buildIntValue = buildIntValue;
exports.getScriptAttributeFieldCount = getScriptAttributeFieldCount;
/* ScriptToolEngine-WonderEditor Not a pure module */
