

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as WDBTool$WonderEditor from "../../tool/WDBTool.js";
import * as LoadTool$WonderEditor from "../asset/tool/LoadTool.js";
import * as MainUtils$WonderEditor from "../../../src/core/utils/engine/MainUtils.js";
import * as LoadWDBTool$WonderEditor from "../tool/LoadWDBTool.js";
import * as RedoUndoTool$WonderEditor from "../redo_undo/tool/RedoUndoTool.js";
import * as SettingToolEngine$WonderEditor from "../../tool/engine/SettingToolEngine.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as GeometryEngineService$WonderEditor from "../../../src/service/state/engine/GeometryEngineService.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../asset/tool/MainEditorAssetUploadTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../src/service/state/engine/GameObjectComponentEngineService.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../asset/tool/MainEditorAssetHeaderOperateNodeTool.js";

describe("test reallocate cpu memory job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareState = function () {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               },\n{\n                    \"name\": \"reallocate_cpu_memory\"\n                }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
          return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test redo-undo after reallocate", (function () {
                var cubeTexturedWDBArrayBuffer = /* record */[/* contents */1];
                var truckWDBArrayBuffer = /* record */[/* contents */1];
                var _judge = function (uploadedWDBNodeId) {
                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                  var match = LoadWDBTool$WonderEditor.getCubeTexturedGeometryData(/* () */0);
                  var __x = LoadWDBTool$WonderEditor.getCubeTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId, /* tuple */[
                        editorState,
                        engineState
                      ]);
                  var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(__x, engineState);
                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryEngineService$WonderEditor.getGeometryVertices(__x$1, engineState)), match[0]));
                };
                beforeAll((function () {
                        cubeTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("CubeTextured");
                        truckWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("CesiumMilkTruck");
                        return /* () */0;
                      }));
                beforeEach((function () {
                        _prepareState(/* () */0);
                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                        var engineState$1 = SettingToolEngine$WonderEditor.setMemory(engineState, 1, /* () */0);
                        StateEngineService$WonderEditor.setState(engineState$1);
                        StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                        LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                        LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                        return LoadTool$WonderEditor.buildFakeLoadImage();
                      }));
                Wonder_jest.testPromise("\n        load wdb w1;\n        remove w1(trigger reallocate);\n        undo;\n\n        w1->vertices should exist.\n        ", (function () {
                        return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId, /* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return _judge(uploadedWDBNodeId);
                                    }));
                      }));
                Wonder_jest.testPromise("\n        load wdb w1;\n        remove w1(trigger reallocate);\n        load wdb w2;\n        undo;\n        undo;\n\n        w1->vertices should exist.\n        ", (function () {
                        return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId1) {
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId1, /* () */0);
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(truckWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
                                                    RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                    RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                    return _judge(uploadedWDBNodeId1);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.testPromise("\n        load wdb w1;\n        remove w1(trigger reallocate);\n        load wdb w2;\n        undo;\n        undo;\n        redo;\n        redo;\n\n        w2->vertices should exist.\n        ", (function () {
                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(truckWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId1) {
                                            StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId1, /* () */0);
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId2) {
                                                          RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          return _judge(uploadedWDBNodeId2);
                                                        }));
                                          }));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
