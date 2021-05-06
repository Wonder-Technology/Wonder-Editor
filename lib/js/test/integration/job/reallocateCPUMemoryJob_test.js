'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../tool/WDBTool.js");
var LoadTool$WonderEditor = require("../asset/tool/LoadTool.js");
var MainUtils$WonderEditor = require("../../../src/core/utils/engine/MainUtils.js");
var CanvasTool$WonderEditor = require("../../unit/atom_component/canvas/tool/CanvasTool.js");
var LoadWDBTool$WonderEditor = require("../tool/LoadWDBTool.js");
var RedoUndoTool$WonderEditor = require("../redo_undo/tool/RedoUndoTool.js");
var SettingToolEngine$WonderEditor = require("../../tool/engine/SettingToolEngine.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var GeometryEngineService$WonderEditor = require("../../../src/service/state/engine/GeometryEngineService.js");
var MainEditorAssetUploadTool$WonderEditor = require("../asset/tool/MainEditorAssetUploadTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("test reallocate cpu memory job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareState = function (param) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               },\n{\n                    \"name\": \"reallocate_cpu_memory\"\n                }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
          MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), SettingToolEngine$WonderEditor.buildBufferConfigStr(50000, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), false, /* () */0);
          StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
          CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
          return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test redo-undo after reallocate", (function (param) {
                      var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
                      var truckWDBArrayBuffer = /* record */[/* contents */1];
                      var _judge = function (uploadedWDBNodeId) {
                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                        var match = LoadWDBTool$WonderEditor.getBoxTexturedGeometryData(/* () */0);
                        var __x = LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId, /* tuple */[
                              editorState,
                              engineState
                            ]);
                        var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(__x, engineState);
                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryEngineService$WonderEditor.unsafeGetGeometryVertices(__x$1, engineState)), match[0]));
                      };
                      beforeAll((function () {
                              boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
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
                      Wonder_jest.testPromise("\n        load wdb w1;\n        remove w1(trigger reallocate);\n        undo;\n\n        w1->vertices should exist.\n        ", undefined, (function (param) {
                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId, /* () */0);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            return _judge(uploadedWDBNodeId);
                                          }));
                            }));
                      Wonder_jest.testPromise("\n           load wdb w1;\n           remove w1(trigger reallocate);\n           load wdb w2;\n           undo;\n           undo;\n\n           w1->vertices should exist.\n           ", undefined, (function (param) {
                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId1) {
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId1, /* () */0);
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(truckWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId2) {
                                                          RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          return _judge(uploadedWDBNodeId1);
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.testPromise("\n        load wdb w1;\n        remove w1(trigger reallocate);\n        load wdb w2;\n        undo;\n        undo;\n        redo;\n        redo;\n\n        w2->vertices should exist.\n        ", undefined, (function (param) {
                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(truckWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId1) {
                                                  StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId1, /* () */0);
                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId2) {
                                                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                                RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                                RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                                return _judge(uploadedWDBNodeId2);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
