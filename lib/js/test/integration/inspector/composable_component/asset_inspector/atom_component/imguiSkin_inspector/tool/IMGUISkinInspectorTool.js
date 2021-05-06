'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var SinonTool$WonderEditor = require("../../../../../../../tool/SinonTool.js");
var IMGUISkinInspector$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/imguiSkin_inspector/ui/IMGUISkinInspector.js");
var StateEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/state/StateEngineService.js");
var ExtendIMGUIEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/imgui/ExtendIMGUIEngineService.js");
var IMGUISkinNodeAssetService$WonderEditor = require("../../../../../../../../src/service/record/editor/asset/IMGUISkinNodeAssetService.js");
var IMGUISkinNodeAssetEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/asset/IMGUISkinNodeAssetEditorService.js");

function addSkin(nodeId) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  StateEngineService$WonderEditor.setState(Curry._3(ExtendIMGUIEngineService$WonderEditor.addSkinData, IMGUISkinNodeAssetEditorService$WonderEditor.getNodeName(nodeId, editorState), IMGUISkinNodeAssetEditorService$WonderEditor.getSingleSkinData(nodeId, editorState), engineState));
  return /* () */0;
}

function createButtonSkinData($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, param) {
  var buttonColor = $staropt$star !== undefined ? $staropt$star : /* array */[
      0,
      0,
      0
    ];
  var hoverButtonColor = $staropt$star$1 !== undefined ? $staropt$star$1 : /* array */[
      0,
      0,
      0
    ];
  var clickButtonColor = $staropt$star$2 !== undefined ? $staropt$star$2 : /* array */[
      0,
      0,
      0
    ];
  var buttonImage = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : null;
  var hoverButtonImage = $staropt$star$4 !== undefined ? Caml_option.valFromOption($staropt$star$4) : null;
  var clickButtonImage = $staropt$star$5 !== undefined ? Caml_option.valFromOption($staropt$star$5) : null;
  var fontAlign = $staropt$star$6 !== undefined ? $staropt$star$6 : /* Left */0;
  var fontColor = $staropt$star$7 !== undefined ? $staropt$star$7 : /* array */[
      0,
      0,
      0
    ];
  return ExtendIMGUIEngineService$WonderEditor.createButtonSkinData(buttonColor, hoverButtonColor, clickButtonColor, buttonImage, hoverButtonImage, clickButtonImage, fontAlign, fontColor);
}

function createAllCustomStyleData1(param) {
  return ExtendIMGUIEngineService$WonderEditor.addSingleCustomStyleData("s1", ExtendIMGUIEngineService$WonderEditor.addCustomStyleData("c1", 1, ExtendIMGUIEngineService$WonderEditor.createSingleCustomStyleData(/* () */0)), ExtendIMGUIEngineService$WonderEditor.createAllCustomStyleData(/* () */0));
}

function setNodeData(nodeId, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var name = $staropt$star !== undefined ? $staropt$star : "";
  var buttonSkinData = $staropt$star$1 !== undefined ? $staropt$star$1 : ExtendIMGUIEngineService$WonderEditor.createButtonSkinData(/* array */[
          0,
          0,
          0
        ], /* array */[
          0,
          0,
          0
        ], /* array */[
          0,
          0,
          0
        ], null, null, null, /* Left */0, /* array */[
          0,
          0,
          0
        ]);
  var allCustomStyleData = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : ExtendIMGUIEngineService$WonderEditor.createAllCustomStyleData(/* () */0);
  var editorState = $staropt$star$3 !== undefined ? $staropt$star$3 : StateEditorService$WonderEditor.getState(/* () */0);
  return IMGUISkinNodeAssetEditorService$WonderEditor.setNodeData(nodeId, IMGUISkinNodeAssetService$WonderEditor.buildNodeData(name, buttonSkinData, allCustomStyleData), editorState);
}

function submitAll(nodeId, buttonSkinData, allCustomStyleDataStr, originSkinName, $staropt$star, param) {
  var send = $staropt$star !== undefined ? $staropt$star : Curry._1(SinonTool$WonderEditor.createOneLengthStub, Sinon.sandbox.create());
  return IMGUISkinInspector$WonderEditor.Method[/* submit */5](nodeId, /* record */[
              /* buttonSkinData */buttonSkinData,
              /* allCustomStyleDataStr */allCustomStyleDataStr,
              /* originSkinName */originSkinName
            ], send);
}

var serializeAllCustomStyleData = IMGUISkinInspector$WonderEditor.Method[/* buildAllCustomStyleDataInputValue */2];

var deserializeAllCustomStyleData = IMGUISkinInspector$WonderEditor.Method[/* _convertInputValueStrToAllCustomStyleData */3];

exports.addSkin = addSkin;
exports.createButtonSkinData = createButtonSkinData;
exports.createAllCustomStyleData1 = createAllCustomStyleData1;
exports.setNodeData = setNodeData;
exports.submitAll = submitAll;
exports.serializeAllCustomStyleData = serializeAllCustomStyleData;
exports.deserializeAllCustomStyleData = deserializeAllCustomStyleData;
/* sinon Not a pure module */
