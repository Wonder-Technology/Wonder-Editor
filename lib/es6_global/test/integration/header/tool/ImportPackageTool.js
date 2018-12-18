

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Header$WonderEditor from "../../../../src/core/composable_component/header/ui/Header.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as ArrayService$WonderEditor from "../../../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as JobEngineService$WonderEditor from "../../../../src/service/state/engine/JobEngineService.js";
import * as SparseMapService$WonderEditor from "../../../../src/service/atom/SparseMapService.js";
import * as ExportPackageTool$WonderEditor from "./ExportPackageTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as HeaderImportPackageUtils$WonderEditor from "../../../../src/core/composable_component/header/utils/import/HeaderImportPackageUtils.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/WDBNodeMapAssetEditorService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/TextureNodeMapAssetEditorService.js";
import * as MaterialNodeMapAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/MaterialNodeMapAssetEditorService.js";

function testImportPackageWithoutExport(testFunc, wpkArrayBuffer, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var fileName = $staropt$star$2 !== undefined ? $staropt$star$2 : "Wpk";
  return Header$WonderEditor.Method[/* importPackage */0](/* tuple */[
                store,
                dispatchFunc
              ], /* tuple */[
                (function (param) {
                    return /* () */0;
                  }),
                -1
              ], BaseEventTool$WonderEditor.buildPackageFileEvent(fileName, wpkArrayBuffer)).then((function (param) {
                return Curry._1(testFunc, /* () */0);
              }));
}

function testImportPackage(testFunc, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var execBeforeImportFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : (function (wpkArrayBuffer) {
        return /* () */0;
      });
  var fileName = $staropt$star$3 !== undefined ? $staropt$star$3 : "Wpk";
  var wpkArrayBuffer = ExportPackageTool$WonderEditor.exportWPK(/* () */0);
  Curry._1(execBeforeImportFunc, wpkArrayBuffer);
  return testImportPackageWithoutExport(testFunc, wpkArrayBuffer, store, dispatchFunc, fileName, /* () */0);
}

function getImportedMaterialAssetResults(param) {
  return StateLogicService$WonderEditor.getEditorState(MaterialNodeMapAssetEditorService$WonderEditor.getResults);
}

function getFirstImportedMaterialAssetData(param) {
  var match = ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getEditorState(MaterialNodeMapAssetEditorService$WonderEditor.getResults));
  return /* tuple */[
          match[0],
          match[1][/* materialComponent */2]
        ];
}

function getImporteMaterialAssetMaterialComponents(param) {
  return StateLogicService$WonderEditor.getEditorState(MaterialNodeMapAssetEditorService$WonderEditor.getValidValues).map((function (param) {
                return param[/* materialComponent */2];
              }));
}

function getImporteMaterialAssetBasicMaterialComponents(param) {
  return StateLogicService$WonderEditor.getEditorState(MaterialNodeMapAssetEditorService$WonderEditor.getValidValues).filter((function (param) {
                  return param[/* type_ */1] === /* BasicMaterial */0;
                })).map((function (param) {
                return param[/* materialComponent */2];
              }));
}

function getImporteMaterialAssetLightMaterialComponents(param) {
  return StateLogicService$WonderEditor.getEditorState(MaterialNodeMapAssetEditorService$WonderEditor.getValidValues).filter((function (param) {
                  return param[/* type_ */1] === /* LightMaterial */1;
                })).map((function (param) {
                return param[/* materialComponent */2];
              }));
}

function getImportedTextureAssetTextureComponents(param) {
  return StateLogicService$WonderEditor.getEditorState(TextureNodeMapAssetEditorService$WonderEditor.getValidValues).map((function (param) {
                return param[/* textureComponent */0];
              }));
}

function getImportedWDBAssetData(param) {
  return SparseMapService$WonderEditor.getValidDataArr(WDBNodeMapAssetEditorService$WonderEditor.getWDBNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
}

function getFirstImportedWDBAssetData(param) {
  return ArrayService$WonderEditor.unsafeGetFirst(SparseMapService$WonderEditor.getValidDataArr(WDBNodeMapAssetEditorService$WonderEditor.getWDBNodeMap(StateEditorService$WonderEditor.getState(/* () */0))));
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
  getImportedMaterialAssetResults ,
  getFirstImportedMaterialAssetData ,
  getImporteMaterialAssetMaterialComponents ,
  getImporteMaterialAssetBasicMaterialComponents ,
  getImporteMaterialAssetLightMaterialComponents ,
  getImportedTextureAssetTextureComponents ,
  getImportedWDBAssetData ,
  getFirstImportedWDBAssetData ,
  disposeAssets ,
  buildFakeCanvas ,
  buildBase64_1 ,
  buildBase64_2 ,
  prepareFakeCanvas ,
  
}
/* Sinon Not a pure module */
