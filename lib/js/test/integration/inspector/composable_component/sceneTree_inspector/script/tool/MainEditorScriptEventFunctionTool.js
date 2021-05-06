'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var ReactTool$WonderEditor = require("../../../../../../tool/ui/ReactTool.js");
var NodeAssetService$WonderEditor = require("../../../../../../../src/service/record/editor/asset/NodeAssetService.js");
var StateEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorScriptEventFunction$WonderEditor = require("../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/script/atom_component/eventFunction/ui/MainEditorScriptEventFunction.js");
var MainEditorScriptEventFunctionUtils$WonderEditor = require("../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/script/atom_component/eventFunction/utils/MainEditorScriptEventFunctionUtils.js");

function buildState(currentScript, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, param) {
  var isShowScriptEventFunctionGroupForAdd = $staropt$star !== undefined ? $staropt$star : false;
  var isShowScriptEventFunctionGroupForChange = $staropt$star$1 !== undefined ? $staropt$star$1 : false;
  var lastScriptEventFunctionNodeIdForAdd = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : undefined;
  var lastScriptEventFunctionNodeIdForChange = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : undefined;
  var unUsedScriptEventFunctionNodeIds = $staropt$star$4 !== undefined ? $staropt$star$4 : /* array */[];
  return /* record */[
          /* currentScript */currentScript,
          /* isShowScriptEventFunctionGroupForAdd */isShowScriptEventFunctionGroupForAdd,
          /* isShowScriptEventFunctionGroupForChange */isShowScriptEventFunctionGroupForChange,
          /* lastScriptEventFunctionNodeIdForAdd */lastScriptEventFunctionNodeIdForAdd,
          /* lastScriptEventFunctionNodeIdForChange */lastScriptEventFunctionNodeIdForChange,
          /* unUsedScriptEventFunctionNodeIds */unUsedScriptEventFunctionNodeIds
        ];
}

var reducer = MainEditorScriptEventFunction$WonderEditor.reducer;

function getUpdateState(state, func) {
  var actionRef = /* record */[/* contents */-1];
  Curry._1(func, (function (action) {
          actionRef[0] = action;
          return /* () */0;
        }));
  return ReactTool$WonderEditor.getUpdateState(MainEditorScriptEventFunction$WonderEditor.reducer(actionRef[0], state));
}

function addScriptEventFunction(script, send, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var languageType = $staropt$star !== undefined ? $staropt$star : /* EN */1;
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorScriptEventFunction$WonderEditor.Method[/* addScriptEventFunction */5], /* tuple */[
              uiState,
              dispatchFunc
            ], /* tuple */[
              languageType,
              (function (lastScriptEventFunctionNodeIdForAdd, unUsedScriptEventFunctionNodeIds) {
                  return Curry._1(send, /* ShowScriptEventFunctionGroupForAdd */Block.__(2, [
                                lastScriptEventFunctionNodeIdForAdd,
                                unUsedScriptEventFunctionNodeIds
                              ]));
                })
            ], script);
}

function sendShowScriptEventFunctionGroupForChange(send, script, scriptEventFunctionNodeId, $staropt$star, $staropt$star$1, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = $staropt$star$1 !== undefined ? $staropt$star$1 : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return MainEditorScriptEventFunction$WonderEditor.Method[/* _sendShowScriptEventFunctionGroupForChange */0](script, scriptEventFunctionNodeId, send, /* tuple */[
              editorState,
              engineState
            ]);
}

function getUnUsedScriptEventFunctionNodeIds(script, param) {
  return MainEditorScriptEventFunctionUtils$WonderEditor.getUnUsedScriptEventFunctionNodes(script, /* tuple */[
                param[0],
                param[1]
              ]).map(NodeAssetService$WonderEditor.getNodeId);
}

function handleChangeScriptEventFunction(script, send, currentScriptEventFunctionNodeId, targetScriptEventFunctionNodeId, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorScriptEventFunction$WonderEditor.Method[/* handleChangeScriptEventFunction */4], /* tuple */[
              uiState,
              dispatchFunc
            ], (function (targetScriptEventFunctionNodeId, unUsedScriptEventFunctionNodeIds) {
                return Curry._1(send, /* ChangeScriptEventFunctionForAdd */Block.__(0, [
                              targetScriptEventFunctionNodeId,
                              unUsedScriptEventFunctionNodeIds
                            ]));
              }), /* tuple */[
              script,
              currentScriptEventFunctionNodeId,
              targetScriptEventFunctionNodeId
            ]);
}

function removeScriptEventFunction(script, eventFunctionName, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorScriptEventFunction$WonderEditor.Method[/* _removeScriptEventFunction */1], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* tuple */[
              script,
              eventFunctionName
            ]);
}

exports.buildState = buildState;
exports.reducer = reducer;
exports.getUpdateState = getUpdateState;
exports.addScriptEventFunction = addScriptEventFunction;
exports.sendShowScriptEventFunctionGroupForChange = sendShowScriptEventFunctionGroupForChange;
exports.getUnUsedScriptEventFunctionNodeIds = getUnUsedScriptEventFunctionNodeIds;
exports.handleChangeScriptEventFunction = handleChangeScriptEventFunction;
exports.removeScriptEventFunction = removeScriptEventFunction;
/* TestTool-WonderEditor Not a pure module */
