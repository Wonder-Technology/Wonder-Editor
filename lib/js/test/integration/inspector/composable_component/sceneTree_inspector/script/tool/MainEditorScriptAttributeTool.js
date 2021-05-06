'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var ReactTool$WonderEditor = require("../../../../../../tool/ui/ReactTool.js");
var StateEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorScriptAttribute$WonderEditor = require("../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/script/atom_component/attribute/ui/MainEditorScriptAttribute.js");
var ScriptChangeScriptAttributeEventHandler$WonderEditor = require("../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/script/atom_component/attribute/eventHandler/ScriptChangeScriptAttributeEventHandler.js");

function buildState(currentScript, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, param) {
  var isShowScriptAttributeGroupForAdd = $staropt$star !== undefined ? $staropt$star : false;
  var isShowScriptAttributeGroupForChange = $staropt$star$1 !== undefined ? $staropt$star$1 : false;
  var lastScriptAttributeNodeIdForAdd = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : undefined;
  var lastScriptAttributeNodeIdForChange = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : undefined;
  var unUsedScriptAttributeNodeIds = $staropt$star$4 !== undefined ? $staropt$star$4 : /* array */[];
  return /* record */[
          /* currentScript */currentScript,
          /* isShowScriptAttributeGroupForAdd */isShowScriptAttributeGroupForAdd,
          /* isShowScriptAttributeGroupForChange */isShowScriptAttributeGroupForChange,
          /* lastScriptAttributeNodeIdForAdd */lastScriptAttributeNodeIdForAdd,
          /* lastScriptAttributeNodeIdForChange */lastScriptAttributeNodeIdForChange,
          /* unUsedScriptAttributeNodeIds */unUsedScriptAttributeNodeIds
        ];
}

var reducer = MainEditorScriptAttribute$WonderEditor.reducer;

function getUpdateState(state, func) {
  var actionRef = /* record */[/* contents */-1];
  Curry._1(func, (function (action) {
          actionRef[0] = action;
          return /* () */0;
        }));
  return ReactTool$WonderEditor.getUpdateState(MainEditorScriptAttribute$WonderEditor.reducer(actionRef[0], state));
}

function changeScriptAttribute(currentScript, currentScriptAttributeNodeIdOpt, targetScriptAttributeNodeId, $staropt$star, $staropt$star$1, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = $staropt$star$1 !== undefined ? $staropt$star$1 : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return ScriptChangeScriptAttributeEventHandler$WonderEditor.CustomEventHandler[/* _changeScriptAttribute */2](currentScript, currentScriptAttributeNodeIdOpt, targetScriptAttributeNodeId, /* tuple */[
              editorState,
              engineState
            ]);
}

function addScriptAttribute(script, send, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var languageType = $staropt$star !== undefined ? $staropt$star : /* EN */1;
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorScriptAttribute$WonderEditor.Method[/* addScriptAttribute */13], /* tuple */[
              uiState,
              dispatchFunc
            ], /* tuple */[
              languageType,
              (function (lastScriptAttributeNodeIdForAdd, unUsedScriptAttributeNodeIds) {
                  return Curry._1(send, /* ShowScriptAttributeGroupForAdd */Block.__(2, [
                                lastScriptAttributeNodeIdForAdd,
                                unUsedScriptAttributeNodeIds
                              ]));
                })
            ], script);
}

function sendShowScriptAttributeGroupForChange(send, script, scriptAttributeNodeId, $staropt$star, $staropt$star$1, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = $staropt$star$1 !== undefined ? $staropt$star$1 : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return MainEditorScriptAttribute$WonderEditor.Method[/* _sendShowScriptAttributeGroupForChange */0](script, scriptAttributeNodeId, send, /* tuple */[
              editorState,
              engineState
            ]);
}

function handleChangeScriptAttributeForChange(script, send, currentScriptAttributeNodeId, targetScriptAttributeNodeId, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorScriptAttribute$WonderEditor.Method[/* handleChangeScriptAttribute */12], /* tuple */[
              uiState,
              dispatchFunc
            ], (function (targetScriptAttributeNodeId, unUsedScriptAttributeNodeIds) {
                return Curry._1(send, /* ChangeScriptAttributeForChange */Block.__(1, [
                              targetScriptAttributeNodeId,
                              unUsedScriptAttributeNodeIds
                            ]));
              }), /* tuple */[
              script,
              currentScriptAttributeNodeId,
              targetScriptAttributeNodeId
            ]);
}

function removeScriptAttribute(script, attributeName, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorScriptAttribute$WonderEditor.Method[/* _removeScriptAttribute */1], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* tuple */[
              script,
              attributeName
            ]);
}

function changeScriptAttributeFieldDefaultValueFloat(script, attributeName, fieldName, attribute, defaultValue) {
  return MainEditorScriptAttribute$WonderEditor.Method[/* _changeScriptAttributeFieldDefaultValue */2](script, /* tuple */[
              attributeName,
              fieldName
            ], attribute, defaultValue);
}

function changeScriptAttributeFieldDefaultValueInt(script, attributeName, fieldName, attribute, defaultValue) {
  return MainEditorScriptAttribute$WonderEditor.Method[/* _changeScriptAttributeFieldDefaultValue */2](script, /* tuple */[
              attributeName,
              fieldName
            ], attribute, defaultValue);
}

function blurScriptAttributeFieldDefaultValueFloat(script, attributeName, fieldName, attribute, defaultValue) {
  return MainEditorScriptAttribute$WonderEditor.Method[/* _blurScriptAttributeFieldDefaultValue */5](/* tuple */[
              TestTool$WonderEditor.buildEmptyAppState(/* () */0),
              TestTool$WonderEditor.getDispatch(/* () */0)
            ], MainEditorScriptAttribute$WonderEditor.Method[/* _isFloatValueEqual */3], /* tuple */[
              script,
              attributeName,
              fieldName,
              attribute,
              defaultValue
            ]);
}

exports.buildState = buildState;
exports.reducer = reducer;
exports.getUpdateState = getUpdateState;
exports.changeScriptAttribute = changeScriptAttribute;
exports.addScriptAttribute = addScriptAttribute;
exports.sendShowScriptAttributeGroupForChange = sendShowScriptAttributeGroupForChange;
exports.handleChangeScriptAttributeForChange = handleChangeScriptAttributeForChange;
exports.removeScriptAttribute = removeScriptAttribute;
exports.changeScriptAttributeFieldDefaultValueFloat = changeScriptAttributeFieldDefaultValueFloat;
exports.changeScriptAttributeFieldDefaultValueInt = changeScriptAttributeFieldDefaultValueInt;
exports.blurScriptAttributeFieldDefaultValueFloat = blurScriptAttributeFieldDefaultValueFloat;
/* TestTool-WonderEditor Not a pure module */
