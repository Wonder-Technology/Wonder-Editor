'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var WDBTool$WonderEditor = require("../../../tool/WDBTool.js");
var Base64Tool$WonderEditor = require("../../../tool/Base64Tool.js");
var ImageUtils$WonderEditor = require("../../../../src/core/composable_component/utils/ImageUtils.js");
var OptionService$WonderEditor = require("../../../../src/service/primitive/OptionService.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var CubemapNodeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/CubemapNodeAssetService.js");
var CubemapTextureToolEngine$WonderEditor = require("../../../tool/engine/CubemapTextureToolEngine.js");
var NodeNameAssetLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/asset/NodeNameAssetLogicService.js");
var CubemapTextureEngineService$WonderEditor = require("../../../../src/service/state/engine/texture/CubemapTextureEngineService.js");
var CubemapNodeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/CubemapNodeAssetEditorService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var CubemapTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/imageDataMap/CubemapTextureImageDataMapAssetEditorService.js");
var LoadAndSetCubemapInspectorFaceSourceEventHandler$WonderEditor = require("../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/cubemap_inspector/atom_component/eventHanadler/LoadAndSetCubemapInspectorFaceSourceEventHandler.js");

function getCubemapTextureComponent(nodeId, $staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  return CubemapNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState))[/* textureComponent */0];
}

function getImageDataIndex(nodeId, $staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  return CubemapNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState))[/* imageDataIndex */1];
}

function getImageDataIndexByTextureComponent(textureComponent, $staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  return OptionService$WonderEditor.unsafeGet(CubemapNodeAssetEditorService$WonderEditor.getDataByTextureComponent(textureComponent, editorState))[/* imageDataIndex */1];
}

function getCubemapName(nodeId, $staropt$star, $staropt$star$1, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = $staropt$star$1 !== undefined ? $staropt$star$1 : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return NodeNameAssetLogicService$WonderEditor.getCubemapNodeName(getCubemapTextureComponent(nodeId, editorState, /* () */0), engineState);
}

function _setOneFaceImageDataToImageDataMap(imageDataIndex, source, base64, setFaceImageDataFunc, editorState) {
  return Curry._3(setFaceImageDataFunc, imageDataIndex, LoadAndSetCubemapInspectorFaceSourceEventHandler$WonderEditor.CustomEventHandler[/* _buildImageData */5](ImageUtils$WonderEditor.getImageName(source), base64, editorState), editorState);
}

function setAllSources(nodeId, $staropt$star, $staropt$star$1, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  if ($staropt$star$1 === undefined) {
    StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  }
  var match = CubemapTextureToolEngine$WonderEditor.setAllSources(StateEngineService$WonderEditor.unsafeGetState(/* () */0), getCubemapTextureComponent(nodeId, editorState, /* () */0), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var match$1 = match[1];
  var source6 = match$1[5];
  var source5 = match$1[4];
  var source4 = match$1[3];
  var source3 = match$1[2];
  var source2 = match$1[1];
  var source1 = match$1[0];
  var match$2 = WDBTool$WonderEditor.buildCubemapAllFaceSourceBase64(/* () */0);
  var base64_6 = match$2[5];
  var base64_5 = match$2[4];
  var base64_4 = match$2[3];
  var base64_3 = match$2[2];
  var base64_2 = match$2[1];
  var base64_1 = match$2[0];
  var imageDataIndex = getImageDataIndex(nodeId, editorState, /* () */0);
  var editorState$1 = _setOneFaceImageDataToImageDataMap(imageDataIndex, source6, base64_6, CubemapTextureImageDataMapAssetEditorService$WonderEditor.setNZImageData, _setOneFaceImageDataToImageDataMap(imageDataIndex, source5, base64_5, CubemapTextureImageDataMapAssetEditorService$WonderEditor.setPZImageData, _setOneFaceImageDataToImageDataMap(imageDataIndex, source4, base64_4, CubemapTextureImageDataMapAssetEditorService$WonderEditor.setNYImageData, _setOneFaceImageDataToImageDataMap(imageDataIndex, source3, base64_3, CubemapTextureImageDataMapAssetEditorService$WonderEditor.setPYImageData, _setOneFaceImageDataToImageDataMap(imageDataIndex, source2, base64_2, CubemapTextureImageDataMapAssetEditorService$WonderEditor.setNXImageData, _setOneFaceImageDataToImageDataMap(imageDataIndex, source1, base64_1, CubemapTextureImageDataMapAssetEditorService$WonderEditor.setPXImageData, editorState))))));
  return /* tuple */[
          /* tuple */[
            editorState$1,
            match[0]
          ],
          /* tuple */[
            source1,
            source2,
            source3,
            source4,
            source5,
            source6
          ],
          /* tuple */[
            base64_1,
            base64_2,
            base64_3,
            base64_4,
            base64_5,
            base64_6
          ]
        ];
}

function changeFaceSource(textureComponent, faceSource, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, param) {
  var faceSourceBase64 = $staropt$star !== undefined ? $staropt$star : Base64Tool$WonderEditor.buildFakeBase64_1(/* () */0);
  var setSourceFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : CubemapTextureEngineService$WonderEditor.setPXSource;
  var setFormatFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : CubemapTextureEngineService$WonderEditor.setPXFormat;
  var setFaceImageDataFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : CubemapTextureImageDataMapAssetEditorService$WonderEditor.setPXImageData;
  var editorState = $staropt$star$4 !== undefined ? $staropt$star$4 : StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = $staropt$star$5 !== undefined ? $staropt$star$5 : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return StateLogicService$WonderEditor.setState(LoadAndSetCubemapInspectorFaceSourceEventHandler$WonderEditor.CustomEventHandler[/* _setFaceSource */6](textureComponent, /* tuple */[
                  faceSource,
                  faceSourceBase64
                ], /* tuple */[
                  setSourceFunc,
                  setFormatFunc,
                  setFaceImageDataFunc
                ], /* tuple */[
                  editorState,
                  engineState
                ]));
}

exports.getCubemapTextureComponent = getCubemapTextureComponent;
exports.getImageDataIndex = getImageDataIndex;
exports.getImageDataIndexByTextureComponent = getImageDataIndexByTextureComponent;
exports.getCubemapName = getCubemapName;
exports._setOneFaceImageDataToImageDataMap = _setOneFaceImageDataToImageDataMap;
exports.setAllSources = setAllSources;
exports.changeFaceSource = changeFaceSource;
/* WDBTool-WonderEditor Not a pure module */
