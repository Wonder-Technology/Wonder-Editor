

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as HeaderEdit$WonderEditor from "../../../../src/core/composable_component/header/atom_component/edit/HeaderEdit.js";
import * as ArrayService$WonderEditor from "../../../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as JobEngineService$WonderEditor from "../../../../src/service/state/engine/job/JobEngineService.js";
import * as NodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/NodeAssetService.js";
import * as ExportPackageTool$WonderEditor from "./ExportPackageTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as TextureNodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/TextureNodeAssetService.js";
import * as HeaderImportPackageUtils$WonderEditor from "../../../../src/core/composable_component/header/utils/import/HeaderImportPackageUtils.js";
import * as MaterialNodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/MaterialNodeAssetService.js";
import * as WDBNodeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/WDBNodeAssetEditorService.js";
import * as TextureNodeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/TextureNodeAssetEditorService.js";
import * as MaterialNodeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/MaterialNodeAssetEditorService.js";

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

function getImportedTextureAssetTextureComponents(param) {
  return StateLogicService$WonderEditor.getEditorState(TextureNodeAssetEditorService$WonderEditor.findAllTextureNodes).map((function (node) {
                return TextureNodeAssetService$WonderEditor.getNodeData(node)[/* textureComponent */0];
              }));
}

function getImportedWDBAssetNodeId(param) {
  return StateLogicService$WonderEditor.getEditorState(WDBNodeAssetEditorService$WonderEditor.findAllWDBNodes).map(NodeAssetService$WonderEditor.getNodeId);
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
                      drawImage: Sinon.createEmptyStubWithJsObjSandbox(sandbox)
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

export {
  testImportPackageWithoutExport ,
  testImportPackage ,
  getImportedMaterialAssetNodes ,
  getFirstImportedMaterialAssetData ,
  getImporteMaterialAssetMaterialComponents ,
  getImporteMaterialAssetBasicMaterialComponents ,
  getImporteMaterialAssetLightMaterialComponents ,
  getImportedTextureAssetTextureComponents ,
  getImportedWDBAssetNodeId ,
  disposeAssets ,
  buildFakeCanvas ,
  buildBase64_1 ,
  buildBase64_2 ,
  prepareFakeCanvas ,
  
}
/* Sinon Not a pure module */
