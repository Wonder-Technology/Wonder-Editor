'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var WDBTool$WonderEditor = require("../../../../tool/WDBTool.js");
var LoadTool$WonderEditor = require("../../../asset/tool/LoadTool.js");
var TestTool$WonderEditor = require("../../../../tool/TestTool.js");
var HeaderEdit$WonderEditor = require("../../../../../src/core/composable_component/header/atom_component/edit/HeaderEdit.js");
var ArrayService$WonderEditor = require("../../../../../src/service/atom/ArrayService.js");
var BaseEventTool$WonderEditor = require("../../../../tool/ui/BaseEventTool.js");
var JobEngineService$WonderEditor = require("../../../../../src/service/state/engine/job/JobEngineService.js");
var NodeAssetService$WonderEditor = require("../../../../../src/service/record/editor/asset/NodeAssetService.js");
var ExportPackageTool$WonderEditor = require("../../tool/ExportPackageTool.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var MainEditorAssetTool$WonderEditor = require("../../../asset/tool/MainEditorAssetTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../asset/tool/MainEditorAssetIdTool.js");
var CubemapNodeAssetService$WonderEditor = require("../../../../../src/service/record/editor/asset/CubemapNodeAssetService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../asset/tool/MainEditorAssetTreeTool.js");
var TextureNodeAssetService$WonderEditor = require("../../../../../src/service/record/editor/asset/TextureNodeAssetService.js");
var HeaderImportPackageUtils$WonderEditor = require("../../../../../src/core/composable_component/header/utils/import/HeaderImportPackageUtils.js");
var MaterialNodeAssetService$WonderEditor = require("../../../../../src/service/record/editor/asset/MaterialNodeAssetService.js");
var WDBNodeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/WDBNodeAssetEditorService.js");
var CubemapNodeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/CubemapNodeAssetEditorService.js");
var MainEditorAssetCubemapNodeTool$WonderEditor = require("../../../asset/tool/MainEditorAssetCubemapNodeTool.js");
var MaterialNodeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/MaterialNodeAssetEditorService.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");
var ScriptAttributeNodeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/ScriptAttributeNodeAssetEditorService.js");
var ScriptEventFunctionNodeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/ScriptEventFunctionNodeAssetEditorService.js");
var BasicSourceTypeTextureNodeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/textureNode/BasicSourceTypeTextureNodeAssetEditorService.js");

function prepareLoad(sandbox) {
  LoadTool$WonderEditor.buildFakeAtob(/* () */0);
  LoadTool$WonderEditor.buildFakeBtoa(/* () */0);
  LoadTool$WonderEditor.buildFakeTextEncoder(/* () */0);
  LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
  LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
  LoadTool$WonderEditor.buildFakeLoadImage(/* () */0);
  Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
  return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
}

function testImportPackageWithoutExport(testFunc, wpkArrayBuffer, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var fileName = $staropt$star$2 !== undefined ? $staropt$star$2 : "Wpk";
  return HeaderEdit$WonderEditor.Method[/* importPackage */0](/* tuple */[
                uiState,
                dispatchFunc
              ], (function (param) {
                  return /* () */0;
                }), BaseEventTool$WonderEditor.buildPackageFileEvent(fileName, wpkArrayBuffer)).then((function (param) {
                return Curry._1(testFunc, /* () */0);
              }));
}

function testImportPackage(testFunc, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var execBeforeImportFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : (function (wpkArrayBuffer) {
        return /* () */0;
      });
  var fileName = $staropt$star$3 !== undefined ? $staropt$star$3 : "Wpk";
  var wpkArrayBuffer = ExportPackageTool$WonderEditor.exportWPK(/* () */0);
  Curry._1(execBeforeImportFunc, wpkArrayBuffer);
  return testImportPackageWithoutExport(testFunc, wpkArrayBuffer, uiState, dispatchFunc, fileName, /* () */0);
}

function getImportedMaterialAssetNodes(param) {
  return StateLogicService$WonderEditor.getEditorState(MaterialNodeAssetEditorService$WonderEditor.findAllMaterialNodes);
}

function getFirstImportedMaterialAssetData(param) {
  var node = ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getEditorState(MaterialNodeAssetEditorService$WonderEditor.findAllMaterialNodes));
  var match = MaterialNodeAssetService$WonderEditor.getNodeData(node);
  return /* tuple */[
          NodeAssetService$WonderEditor.getNodeId(node),
          match[/* materialComponent */1]
        ];
}

function getImporteMaterialAssetMaterialComponents(param) {
  return StateLogicService$WonderEditor.getEditorState(MaterialNodeAssetEditorService$WonderEditor.findAllMaterialNodes).map((function (node) {
                return MaterialNodeAssetService$WonderEditor.getNodeData(node)[/* materialComponent */1];
              }));
}

function getImporteMaterialAssetBasicMaterialComponents(param) {
  return StateLogicService$WonderEditor.getEditorState(MaterialNodeAssetEditorService$WonderEditor.findAllMaterialNodes).filter((function (node) {
                  var match = MaterialNodeAssetService$WonderEditor.getNodeData(node);
                  return match[/* type_ */0] === /* BasicMaterial */0;
                })).map((function (node) {
                return MaterialNodeAssetService$WonderEditor.getNodeData(node)[/* materialComponent */1];
              }));
}

function getImporteMaterialAssetLightMaterialComponents(param) {
  return StateLogicService$WonderEditor.getEditorState(MaterialNodeAssetEditorService$WonderEditor.findAllMaterialNodes).filter((function (node) {
                  var match = MaterialNodeAssetService$WonderEditor.getNodeData(node);
                  return match[/* type_ */0] === /* LightMaterial */1;
                })).map((function (node) {
                return MaterialNodeAssetService$WonderEditor.getNodeData(node)[/* materialComponent */1];
              }));
}

function getImportedTextureAssetNodes(param) {
  return StateLogicService$WonderEditor.getEditorState(BasicSourceTypeTextureNodeAssetEditorService$WonderEditor.findAllBasicSourceTypeTextureNodes);
}

function getImportedTextureAssetTextureComponents(param) {
  return StateLogicService$WonderEditor.getEditorState(BasicSourceTypeTextureNodeAssetEditorService$WonderEditor.findAllBasicSourceTypeTextureNodes).map((function (node) {
                return TextureNodeAssetService$WonderEditor.getNodeData(node)[/* textureComponent */2];
              }));
}

function getImportedWDBAssetNodeId(param) {
  return StateLogicService$WonderEditor.getEditorState(WDBNodeAssetEditorService$WonderEditor.findAllWDBNodes).map(NodeAssetService$WonderEditor.getNodeId);
}

function getImportedScriptEventFunctionAssetNodeId(param) {
  return StateLogicService$WonderEditor.getEditorState(ScriptEventFunctionNodeAssetEditorService$WonderEditor.findAllScriptEventFunctionNodes).map(NodeAssetService$WonderEditor.getNodeId);
}

function getImportedScriptAttributeAssetNodeId(param) {
  return StateLogicService$WonderEditor.getEditorState(ScriptAttributeNodeAssetEditorService$WonderEditor.findAllScriptAttributeNodes).map(NodeAssetService$WonderEditor.getNodeId);
}

function disposeAssets(param) {
  HeaderImportPackageUtils$WonderEditor._disposeAssets(/* () */0);
  return StateLogicService$WonderEditor.getAndSetEngineState(JobEngineService$WonderEditor.execDisposeJob);
}

function buildFakeCanvas(sandbox, base64, callIndex) {
  var toDataURLStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  Sinon.returns(base64, toDataURLStub);
  return {
          width: 0,
          height: 0,
          getContext: (function (param) {
              return {
                      drawImage: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                      clearRect: Sinon.createEmptyStubWithJsObjSandbox(sandbox)
                    };
            }),
          toDataURL: toDataURLStub
        };
}

function buildBase64_1(param) {
  return "data:image/png;base64,aaaacccccccccccccccccccccccaaacccccccccccccccccccccccaaacccccccccccccccccccccccaacccccccccccccccccccccccaaaacccccccccccccccccccccccaaacccccccccccccccccccccccaaacccccccccccccccccccccccaaccccccccccccccccccccccc";
}

function buildBase64_2(param) {
  return "data:image/jpeg;base64,bbb";
}

function prepareFakeCanvas(sandbox) {
  var canvas = buildFakeCanvas(sandbox, "data:image/jpeg;base64,bbb", 0);
  var createElementStub = document.createElement;
  Sinon.returns(canvas, Sinon.withOneArg("canvas", createElementStub));
  return /* () */0;
}

function getImportedCubemapAssetCubemapComponents(param) {
  return StateLogicService$WonderEditor.getEditorState(CubemapNodeAssetEditorService$WonderEditor.findAllCubemapNodes).map((function (node) {
                return CubemapNodeAssetService$WonderEditor.getNodeData(node)[/* textureComponent */0];
              }));
}

function prepareForAddOneCubemapAsset(sandbox) {
  WDBTool$WonderEditor.prepareFakeCanvas(sandbox);
  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
  var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
  var match = MainEditorAssetCubemapNodeTool$WonderEditor.setAllSources(addedNodeId, undefined, undefined, /* () */0);
  var match$1 = match[2];
  var match$2 = match[1];
  var match$3 = match[0];
  StateLogicService$WonderEditor.setState(/* tuple */[
        match$3[0],
        match$3[1]
      ]);
  return /* tuple */[
          /* tuple */[
            match$2[0],
            match$2[1],
            match$2[2],
            match$2[3],
            match$2[4],
            match$2[5]
          ],
          /* tuple */[
            match$1[0],
            match$1[1],
            match$1[2],
            match$1[3],
            match$1[4],
            match$1[5]
          ],
          addedNodeId
        ];
}

var Cubemap = /* module */[
  /* getImportedCubemapAssetCubemapComponents */getImportedCubemapAssetCubemapComponents,
  /* prepareForAddOneCubemapAsset */prepareForAddOneCubemapAsset
];

exports.prepareLoad = prepareLoad;
exports.testImportPackageWithoutExport = testImportPackageWithoutExport;
exports.testImportPackage = testImportPackage;
exports.getImportedMaterialAssetNodes = getImportedMaterialAssetNodes;
exports.getFirstImportedMaterialAssetData = getFirstImportedMaterialAssetData;
exports.getImporteMaterialAssetMaterialComponents = getImporteMaterialAssetMaterialComponents;
exports.getImporteMaterialAssetBasicMaterialComponents = getImporteMaterialAssetBasicMaterialComponents;
exports.getImporteMaterialAssetLightMaterialComponents = getImporteMaterialAssetLightMaterialComponents;
exports.getImportedTextureAssetNodes = getImportedTextureAssetNodes;
exports.getImportedTextureAssetTextureComponents = getImportedTextureAssetTextureComponents;
exports.getImportedWDBAssetNodeId = getImportedWDBAssetNodeId;
exports.getImportedScriptEventFunctionAssetNodeId = getImportedScriptEventFunctionAssetNodeId;
exports.getImportedScriptAttributeAssetNodeId = getImportedScriptAttributeAssetNodeId;
exports.disposeAssets = disposeAssets;
exports.buildFakeCanvas = buildFakeCanvas;
exports.buildBase64_1 = buildBase64_1;
exports.buildBase64_2 = buildBase64_2;
exports.prepareFakeCanvas = prepareFakeCanvas;
exports.Cubemap = Cubemap;
/* Sinon Not a pure module */
