'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var TestTool$WonderEditor = require("../../../../../../../tool/TestTool.js");
var SinonTool$WonderEditor = require("../../../../../../../tool/SinonTool.js");
var StringTool$WonderEditor = require("../../../../../../../unit/tool/StringTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../../tool/GameObjectTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../../../../asset/tool/MainEditorAssetIdTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../../../asset/tool/MainEditorAssetTreeTool.js");
var ScriptEventFunctionTool$WonderEditor = require("../../../../sceneTree_inspector/script/tool/ScriptEventFunctionTool.js");
var ScriptEventFunctionInspector$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/scriptEventFunction_inspector/ui/ScriptEventFunctionInspector.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var MainEditorScriptEventFunctionTool$WonderEditor = require("../../../../sceneTree_inspector/script/tool/MainEditorScriptEventFunctionTool.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../../../../atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");
var ScriptEventFunctionNodeAssetService$WonderEditor = require("../../../../../../../../src/service/record/editor/asset/ScriptEventFunctionNodeAssetService.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

function updateEventFunctionData(nodeId, name, eventFunctionJsObjStr) {
  return Curry._3(ScriptEventFunctionInspector$WonderEditor.Method[/* updateEventFunctionData */3], /* tuple */[
              TestTool$WonderEditor.buildEmptyAppState(/* () */0),
              TestTool$WonderEditor.getDispatch(/* () */0)
            ], /* () */0, /* tuple */[
              nodeId,
              name,
              eventFunctionJsObjStr
            ]);
}

function getEventFunctionData(nodeId, editorState) {
  return ScriptEventFunctionNodeAssetService$WonderEditor.getNodeData(StateLogicService$WonderEditor.getEditorState((function (param) {
                      return OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, param);
                    })))[/* eventFunctionData */1];
}

function getEventFunctionName(nodeId, editorState) {
  return ScriptEventFunctionNodeAssetService$WonderEditor.getNodeData(StateLogicService$WonderEditor.getEditorState((function (param) {
                      return OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, param);
                    })))[/* name */0];
}

function getEventFunctionDataJsObjStr(nodeId, editorState) {
  return ScriptEventFunctionTool$WonderEditor.getEventFunctionDataJsObjStr(getEventFunctionData(nodeId, editorState));
}

function buildEventFunctionDataJsObjStr($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var initFunc = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  var updateFunc = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : undefined;
  var disposeFunc = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : undefined;
  return ScriptEventFunctionInspector$WonderEditor.Method[/* convertEventFunctionDataToJsObjStr */2](/* record */[
              /* init */initFunc,
              /* update */updateFunc,
              /* dispose */disposeFunc
            ]);
}

function buildEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var initFunc = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  var updateFunc = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : undefined;
  var disposeFunc = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : undefined;
  return StringTool$WonderEditor.removeNewLinesAndSpaces(buildEventFunctionDataJsObjStr(Caml_option.some(initFunc), Caml_option.some(updateFunc), Caml_option.some(disposeFunc), /* () */0));
}

function buildDefaultEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces(param) {
  return buildEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces(undefined, undefined, undefined, /* () */0);
}

function createDefaultSceneAndAddScriptComponent(sandbox) {
  MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
  return MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
}

function prepareForOneScriptComponent(sandbox) {
  var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
  var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
  MainEditorScriptEventFunctionTool$WonderEditor.addScriptEventFunction(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
  return /* tuple */[
          script,
          addedNodeId
        ];
}

var TestUpdateScriptEventFunctionInAllScriptComponents = /* module */[
  /* createDefaultSceneAndAddScriptComponent */createDefaultSceneAndAddScriptComponent,
  /* prepareForOneScriptComponent */prepareForOneScriptComponent
];

exports.updateEventFunctionData = updateEventFunctionData;
exports.getEventFunctionData = getEventFunctionData;
exports.getEventFunctionName = getEventFunctionName;
exports.getEventFunctionDataJsObjStr = getEventFunctionDataJsObjStr;
exports.buildEventFunctionDataJsObjStr = buildEventFunctionDataJsObjStr;
exports.buildEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces = buildEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces;
exports.buildDefaultEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces = buildDefaultEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces;
exports.TestUpdateScriptEventFunctionInAllScriptComponents = TestUpdateScriptEventFunctionInAllScriptComponents;
/* TestTool-WonderEditor Not a pure module */
