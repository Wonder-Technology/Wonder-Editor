'use strict';

var OptionService$WonderEditor = require("../../../../../../../src/service/primitive/OptionService.js");
var ScriptEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/script/ScriptEngineService.js");
var OperateTreeAssetLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/asset/OperateTreeAssetLogicService.js");
var MainEditorScriptAttributeUtils$WonderEditor = require("../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/script/atom_component/attribute/utils/MainEditorScriptAttributeUtils.js");

function getScriptAllEventFunctionNodeIds(script, param) {
  var engineState = param[1];
  var editorState = param[0];
  return ScriptEngineService$WonderEditor.getScriptAllEventFunctionEntries(script, engineState).map((function (param) {
                return OptionService$WonderEditor.unsafeGet(OperateTreeAssetLogicService$WonderEditor.findNodeIdByName(param[0], /* tuple */[
                                editorState,
                                engineState
                              ]));
              }));
}

function getUnUsedScriptAttributeNodeIds(script, param) {
  return MainEditorScriptAttributeUtils$WonderEditor.getUnUsedScriptAttributeNodeIds(script, /* tuple */[
              param[0],
              param[1]
            ]);
}

function getScriptAllAttributeNodeIds(script, param) {
  var engineState = param[1];
  var editorState = param[0];
  return ScriptEngineService$WonderEditor.getScriptAllAttributeEntries(script, engineState).map((function (param) {
                return OptionService$WonderEditor.unsafeGet(OperateTreeAssetLogicService$WonderEditor.findNodeIdByName(param[0], /* tuple */[
                                editorState,
                                engineState
                              ]));
              }));
}

exports.getScriptAllEventFunctionNodeIds = getScriptAllEventFunctionNodeIds;
exports.getUnUsedScriptAttributeNodeIds = getUnUsedScriptAttributeNodeIds;
exports.getScriptAllAttributeNodeIds = getScriptAllAttributeNodeIds;
/* OptionService-WonderEditor Not a pure module */
