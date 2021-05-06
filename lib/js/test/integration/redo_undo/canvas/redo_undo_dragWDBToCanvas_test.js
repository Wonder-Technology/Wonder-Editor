'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../../tool/WDBTool.js");
var LoadTool$WonderEditor = require("../../asset/tool/LoadTool.js");
var TestTool$WonderEditor = require("../../../tool/TestTool.js");
var MainUtils$WonderEditor = require("../../../../src/core/utils/engine/MainUtils.js");
var CanvasTool$WonderEditor = require("../../../unit/atom_component/canvas/tool/CanvasTool.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var EventListenerTool$WonderEditor = require("../../../unit/tool/EventListenerTool.js");
var BuildComponentTool$WonderEditor = require("../../../tool/BuildComponentTool.js");
var MainEditorAssetTool$WonderEditor = require("../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../asset/tool/MainEditorAssetUploadTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");

Wonder_jest.describe("redo_undo: drag wdb to canvas", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                LoadTool$WonderEditor.buildFakeLoadImage();
                MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test undo operate", (function (param) {
                      return Wonder_jest.describe("test undo one step", (function (param) {
                                    return Wonder_jest.testPromise("step which from second to first", undefined, (function (param) {
                                                  var testFunc = function (param) {
                                                    RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0))));
                                                  };
                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                                                                CanvasTool$WonderEditor.Drag[/* dragWDBAsset */0](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                                CanvasTool$WonderEditor.Drag[/* dragWDBAsset */0](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                return Curry._1(testFunc, /* () */0);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
