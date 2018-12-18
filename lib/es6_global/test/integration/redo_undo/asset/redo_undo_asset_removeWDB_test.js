

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as WDBTool$WonderEditor from "../../../tool/WDBTool.js";
import * as LoadTool$WonderEditor from "../../asset/tool/LoadTool.js";
import * as LoadWDBTool$WonderEditor from "../../tool/LoadWDBTool.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as EventListenerTool$WonderEditor from "../../../unit/tool/EventListenerTool.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as GeometryEngineService$WonderEditor from "../../../../src/service/state/engine/GeometryEngineService.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../asset/tool/MainEditorAssetTreeTool.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../../unit/tool/MainEditorSceneTreeTool.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../../asset/tool/MainEditorAssetUploadTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../src/service/state/engine/GameObjectComponentEngineService.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js";

describe("redo_undo: asset remove wdb", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function (param) {
                boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                return /* () */0;
              }));
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, false, undefined, /* () */0);
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                LoadTool$WonderEditor.buildFakeLoadImage();
                Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("fix bug", (function (param) {
                return Wonder_jest.testPromise("\n            1.load wdb w1;\n            2.drag w1 to scene to be gameObject g1;\n            3.remove w1;\n            4.undo;\n\n            g1->geometry should has point data\n            ", (function (param) {
                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                            MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId, /* () */0);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            var __x = LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObject(engineState);
                                            var geometry = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(__x, engineState);
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                GeometryEngineService$WonderEditor.getGeometryVertices(geometry, engineState).length,
                                                                GeometryEngineService$WonderEditor.getGeometryNormals(geometry, engineState).length,
                                                                GeometryEngineService$WonderEditor.getGeometryTexCoords(geometry, engineState).length,
                                                                GeometryEngineService$WonderEditor.getGeometryIndices(geometry, engineState).length
                                                              ]), /* tuple */[
                                                            72,
                                                            72,
                                                            48,
                                                            36
                                                          ]));
                                          }));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
