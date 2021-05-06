'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var TestTool$WonderEditor = require("../../../../tool/TestTool.js");
var SinonTool$WonderEditor = require("../../../../tool/SinonTool.js");
var MainEditor$WonderEditor = require("../../../../../src/core/composable_component/mainEditor/ui/MainEditor.js");
var BaseEventTool$WonderEditor = require("../../../../tool/ui/BaseEventTool.js");
var BuildCanvasTool$WonderEditor = require("../../../../tool/BuildCanvasTool.js");
var AssetWidgetService$WonderEditor = require("../../../../../src/service/record/editor/widget/AssetWidgetService.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var WDBNodeAssetService$WonderEditor = require("../../../../../src/service/record/editor/asset/WDBNodeAssetService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");

function dragWDBAsset(wdbNodeId, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  if ($staropt$star$2 === undefined) {
    AssetWidgetService$WonderEditor.getWidget(/* () */0);
  }
  if ($staropt$star$4 !== undefined) {
    Caml_option.valFromOption($staropt$star$4);
  } else {
    document.createElement("img");
  }
  if ($staropt$star$5 !== undefined) {
    Caml_option.valFromOption($staropt$star$5);
  } else {
    BaseEventTool$WonderEditor.buildDragEvent();
  }
  var wdbGameObject = WDBNodeAssetService$WonderEditor.getWDBGameObject(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(wdbNodeId, StateEditorService$WonderEditor.getState(/* () */0)));
  return Curry._3(MainEditor$WonderEditor.Method[/* dragWDB */4], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, wdbGameObject);
}

var Drag = /* module */[/* dragWDBAsset */dragWDBAsset];

function _getParentDom(offsetWidth, offsetHeight) {
  return {
          offsetWidth: offsetWidth,
          offsetHeight: offsetHeight,
          style: {
            display: "block"
          }
        };
}

function stubMainCanvasAndInspectorCanvasDom(sandbox, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, param) {
  var offsetWidth = $staropt$star !== undefined ? $staropt$star : 300;
  var offsetHeight = $staropt$star$1 !== undefined ? $staropt$star$1 : 500;
  var canvasWidth = $staropt$star$2 !== undefined ? $staropt$star$2 : 0;
  var canvasHeight = $staropt$star$3 !== undefined ? $staropt$star$3 : 0;
  var getElementStub = $staropt$star$4 !== undefined ? Caml_option.valFromOption($staropt$star$4) : Curry._3(SinonTool$WonderEditor.createMethodStub, sandbox[0], document, "getElementById");
  var mainParentDom = _getParentDom(offsetWidth, offsetHeight);
  var mainCanvasDom = BuildCanvasTool$WonderEditor.getFakeCanvasDom("a", /* tuple */[
        canvasWidth,
        canvasHeight
      ], sandbox);
  var inspectorParentDom = _getParentDom(offsetWidth, offsetHeight);
  var inspectorCanvasDom = BuildCanvasTool$WonderEditor.getFakeCanvasDom("a", /* tuple */[
        canvasWidth,
        canvasHeight
      ], sandbox);
  Sinon.returns(mainParentDom, Sinon.withOneArg("mainCanvasParent", getElementStub));
  Sinon.returns(inspectorParentDom, Sinon.withOneArg("inspectorCanvasParent", getElementStub));
  Sinon.returns(mainCanvasDom, Sinon.withOneArg("main-canvas", getElementStub));
  Sinon.returns(inspectorCanvasDom, Sinon.withOneArg("inspector-canvas", getElementStub));
  return /* tuple */[
          mainParentDom,
          mainCanvasDom,
          inspectorParentDom,
          inspectorCanvasDom
        ];
}

function stubImgCanvasDom(sandbox, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var canvasWidth = $staropt$star !== undefined ? $staropt$star : 50;
  var canvasHeight = $staropt$star$1 !== undefined ? $staropt$star$1 : 50;
  var getElementStub = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : Curry._3(SinonTool$WonderEditor.createMethodStub, sandbox[0], document, "getElementById");
  var imgCanvasDom = BuildCanvasTool$WonderEditor.getFakeCanvasDom("a", /* tuple */[
        canvasWidth,
        canvasHeight
      ], sandbox);
  Sinon.returns(imgCanvasDom, Sinon.withOneArg("img-canvas", getElementStub));
  return imgCanvasDom;
}

function restoreMainCanvasAndInspectorCanvasDom (param){
  document.getElementById = (id) => {
    return undefined;
  };
  };

function prepareInspectorCanvasAndImgCanvas(sandbox) {
  var getElementStub = Curry._3(SinonTool$WonderEditor.createMethodStub, sandbox[0], document, "getElementById");
  var match = stubMainCanvasAndInspectorCanvasDom(sandbox, undefined, undefined, undefined, undefined, Caml_option.some(getElementStub), /* () */0);
  var inspectorCanvasDom = match[3];
  var imgCanvasDom = stubImgCanvasDom(sandbox, undefined, undefined, Caml_option.some(getElementStub), /* () */0);
  var imgCanvasFakeBase64Str = BuildCanvasTool$WonderEditor.getImgCanvasFakeBase64Str(/* () */0);
  Sinon.returns(BuildCanvasTool$WonderEditor.getInspectorCanvasFakeBase64Str(/* () */0), inspectorCanvasDom.toDataURL);
  Sinon.returns(imgCanvasFakeBase64Str, imgCanvasDom.toDataURL);
  return /* tuple */[
          imgCanvasFakeBase64Str,
          /* tuple */[
            inspectorCanvasDom,
            imgCanvasDom
          ]
        ];
}

exports.Drag = Drag;
exports._getParentDom = _getParentDom;
exports.stubMainCanvasAndInspectorCanvasDom = stubMainCanvasAndInspectorCanvasDom;
exports.stubImgCanvasDom = stubImgCanvasDom;
exports.restoreMainCanvasAndInspectorCanvasDom = restoreMainCanvasAndInspectorCanvasDom;
exports.prepareInspectorCanvasAndImgCanvas = prepareInspectorCanvasAndImgCanvas;
/* Sinon Not a pure module */
