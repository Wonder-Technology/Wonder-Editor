'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("sinon");
var SinonTool$WonderEditor = require("../../../../../../../tool/SinonTool.js");
var SerializeService$WonderEditor = require("../../../../../../../../src/service/atom/SerializeService.js");
var StateEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/state/StateEngineService.js");
var ExtendIMGUIEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/imgui/ExtendIMGUIEngineService.js");
var IMGUICustomControlInspector$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/imguiCustomControl_inspector/ui/IMGUICustomControlInspector.js");
var IMGUICustomControlNodeAssetService$WonderEditor = require("../../../../../../../../src/service/record/editor/asset/IMGUICustomControlNodeAssetService.js");
var IMGUICustomControlNodeAssetEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/asset/IMGUICustomControlNodeAssetEditorService.js");

function addCustomControl(nodeId) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  StateEngineService$WonderEditor.setState(Curry._3(ExtendIMGUIEngineService$WonderEditor.registerCustomControl, IMGUICustomControlNodeAssetEditorService$WonderEditor.getNodeName(nodeId, editorState), IMGUICustomControlNodeAssetEditorService$WonderEditor.getCustomControlFunc(nodeId, editorState), engineState));
  return /* () */0;
}

function setNodeData(nodeId, name, customControlFunc, $staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  return IMGUICustomControlNodeAssetEditorService$WonderEditor.setNodeData(nodeId, IMGUICustomControlNodeAssetService$WonderEditor.buildNodeData(name, customControlFunc), editorState);
}

function buildCustomControlFuncStr1(param) {
  return "function (customControlFuncData, showData, apiJsObj, record){\n    var box = apiJsObj.box;\n\n    return [record, null];\n }";
}

function buildCustomControlFunc1(param) {
  return SerializeService$WonderEditor.deserializeFunction("function (customControlFuncData, showData, apiJsObj, record){\n    var box = apiJsObj.box;\n\n    return [record, null];\n }");
}

function submitAll(nodeId, customControlFunc, originCustomControlName, $staropt$star, param) {
  var send = $staropt$star !== undefined ? $staropt$star : Curry._1(SinonTool$WonderEditor.createOneLengthStub, Sinon.sandbox.create());
  return IMGUICustomControlInspector$WonderEditor.Method[/* submit */3](nodeId, /* record */[
              /* customControlFunc */customControlFunc,
              /* originCustomControlName */originCustomControlName
            ], send);
}

exports.addCustomControl = addCustomControl;
exports.setNodeData = setNodeData;
exports.buildCustomControlFuncStr1 = buildCustomControlFuncStr1;
exports.buildCustomControlFunc1 = buildCustomControlFunc1;
exports.submitAll = submitAll;
/* sinon Not a pure module */
