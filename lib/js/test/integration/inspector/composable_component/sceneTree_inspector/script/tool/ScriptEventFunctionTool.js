'use strict';

var StringTool$WonderEditor = require("../../../../../../unit/tool/StringTool.js");
var ScriptEventFunctionInspector$WonderEditor = require("../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/scriptEventFunction_inspector/ui/ScriptEventFunctionInspector.js");

function getEventFunctionDataJsObjStr(eventFunctionData) {
  return StringTool$WonderEditor.removeNewLinesAndSpaces(ScriptEventFunctionInspector$WonderEditor.Method[/* convertEventFunctionDataToJsObjStr */2](eventFunctionData));
}

exports.getEventFunctionDataJsObjStr = getEventFunctionDataJsObjStr;
/* ScriptEventFunctionInspector-WonderEditor Not a pure module */
