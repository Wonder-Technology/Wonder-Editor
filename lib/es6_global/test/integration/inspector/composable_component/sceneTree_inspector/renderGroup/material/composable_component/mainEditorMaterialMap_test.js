

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as WDBTool$WonderEditor from "../../../../../../../tool/WDBTool.js";
import * as LoadTool$WonderEditor from "../../../../../../asset/tool/LoadTool.js";
import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as DragWDBTool$WonderEditor from "../../../../../../tool/DragWDBTool.js";
import * as LoadWDBTool$WonderEditor from "../../../../../../tool/LoadWDBTool.js";
import * as InspectorTool$WonderEditor from "../../../../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../../tool/BuildComponentTool.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../../../../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../../tool/MainEditorSceneTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";

describe("test MainEditorMaterialMap", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepare = function () {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
          Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
          Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
          LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
          LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
          LoadTool$WonderEditor.buildFakeLoadImage();
          return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                        return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                      }));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.testPromise("load asset wdb;\n      drag wdb;\n      select wdb;\n\n      inspector->material map should show its map", (function () {
                      _prepare(/* () */0);
                      return DragWDBTool$WonderEditor.testDragWDB(sandbox, /* tuple */[
                                  "BoxTextured",
                                  WDBTool$WonderEditor.convertGLBToWDB("BoxTextured")
                                ], (function (_, _$1, _$2) {
                                    GameObjectTool$WonderEditor.setCurrentSceneTreeNode(LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
