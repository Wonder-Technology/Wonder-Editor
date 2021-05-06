'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("sinon");
var SinonTool$WonderEditor = require("../../../../../../../tool/SinonTool.js");
var FntInspector$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/fnt_inspector/ui/FntInspector.js");
var StateEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/state/StateEngineService.js");
var FntNodeAssetService$WonderEditor = require("../../../../../../../../src/service/record/editor/asset/FntNodeAssetService.js");
var AssetIMGUIEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/imgui/AssetIMGUIEngineService.js");
var FntNodeAssetEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/asset/FntNodeAssetEditorService.js");

function setSettedAssetFntData(nodeId) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  StateEngineService$WonderEditor.setState(AssetIMGUIEngineService$WonderEditor.setSettedAssetFntData(FntNodeAssetEditorService$WonderEditor.getNodeName(nodeId, editorState), FntNodeAssetEditorService$WonderEditor.getFntContent(nodeId, editorState), engineState));
  return /* () */0;
}

function setNodeData(nodeId, name, fntContent, $staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  return FntNodeAssetEditorService$WonderEditor.setNodeData(nodeId, FntNodeAssetService$WonderEditor.buildNodeData(name, fntContent), editorState);
}

function buildFntContent1(param) {
  return "info face=\"Lato-Regular\" size=64 bold=0 italic=0 charset=\"\" unicode=1 stretchH=100 smooth=1 aa=2 padding=0,0,0,0 spacing=0,0\ncommon lineHeight=77 base=63 scaleW=512 scaleH=512 pages=1 packed=0 alphaChnl=0 redChnl=0 greenChnl=0 blueChnl=0\npage id=0 file=\"lato.png\"\nchars count=96\nchar id=10   x=113  y=187  width=32   height=46   xoffset=1    yoffset=17   xadvance=34   page=0    chnl=0\nkerning first=123 second=113 amount=-2";
}

function submitAll(nodeId, fntContent, originFntName, $staropt$star, param) {
  var send = $staropt$star !== undefined ? $staropt$star : Curry._1(SinonTool$WonderEditor.createOneLengthStub, Sinon.sandbox.create());
  return FntInspector$WonderEditor.Method[/* submit */2](nodeId, /* record */[
              /* fntContent */fntContent,
              /* originFntName */originFntName
            ], send);
}

exports.setSettedAssetFntData = setSettedAssetFntData;
exports.setNodeData = setNodeData;
exports.buildFntContent1 = buildFntContent1;
exports.submitAll = submitAll;
/* sinon Not a pure module */
