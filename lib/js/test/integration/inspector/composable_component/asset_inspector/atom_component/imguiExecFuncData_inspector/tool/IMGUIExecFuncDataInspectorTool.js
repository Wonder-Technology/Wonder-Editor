'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("sinon");
var SinonTool$WonderEditor = require("../../../../../../../tool/SinonTool.js");
var SerializeService$WonderEditor = require("../../../../../../../../src/service/atom/SerializeService.js");
var StateEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/state/StateEngineService.js");
var ExecIMGUIEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/imgui/ExecIMGUIEngineService.js");
var IMGUIExecFuncDataInspector$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/imguiExecFuncData_inspector/ui/IMGUIExecFuncDataInspector.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var IMGUIExecFuncDataNodeAssetService$WonderEditor = require("../../../../../../../../src/service/record/editor/asset/IMGUIExecFuncDataNodeAssetService.js");
var IMGUIExecFuncDataNodeAssetEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/asset/IMGUIExecFuncDataNodeAssetEditorService.js");

function _getCustomData(nodeId, editorState) {
  return IMGUIExecFuncDataNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState))[/* execFuncData */1][/* customData */1];
}

function addExecFuncData(nodeId) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  StateEngineService$WonderEditor.setState(ExecIMGUIEngineService$WonderEditor.addExecFuncData(IMGUIExecFuncDataNodeAssetEditorService$WonderEditor.getNodeName(nodeId, editorState), _getCustomData(nodeId, editorState), IMGUIExecFuncDataNodeAssetEditorService$WonderEditor.getExecOrder(nodeId, editorState), IMGUIExecFuncDataNodeAssetEditorService$WonderEditor.getExecFunc(nodeId, editorState), engineState));
  return /* () */0;
}

function setNodeData(nodeId, name, execFunc, execOrder, $staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  return IMGUIExecFuncDataNodeAssetEditorService$WonderEditor.setNodeData(nodeId, IMGUIExecFuncDataNodeAssetService$WonderEditor.buildNodeData(name, execFunc, execOrder), editorState);
}

function buildExecFuncStr1(param) {
  return "function (customData, imguiAPIJsObj, state){\n    var box = imguiAPIJsObj.box;\n\n    return state;\n }";
}

function buildExecFunc1(param) {
  return SerializeService$WonderEditor.deserializeFunction("function (customData, imguiAPIJsObj, state){\n    var box = imguiAPIJsObj.box;\n\n    return state;\n }");
}

function submitAll(nodeId, execFunc, execOrder, originExecFuncDataName, $staropt$star, param) {
  var send = $staropt$star !== undefined ? $staropt$star : Curry._1(SinonTool$WonderEditor.createOneLengthStub, Sinon.sandbox.create());
  return IMGUIExecFuncDataInspector$WonderEditor.Method[/* submit */4](nodeId, /* record */[
              /* execFunc */execFunc,
              /* execOrder */execOrder,
              /* originExecFuncDataName */originExecFuncDataName
            ], send);
}

exports._getCustomData = _getCustomData;
exports.addExecFuncData = addExecFuncData;
exports.setNodeData = setNodeData;
exports.buildExecFuncStr1 = buildExecFuncStr1;
exports.buildExecFunc1 = buildExecFunc1;
exports.submitAll = submitAll;
/* sinon Not a pure module */
