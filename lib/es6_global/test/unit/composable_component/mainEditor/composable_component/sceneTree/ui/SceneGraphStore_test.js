

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as StoreTool$WonderEditor from "../../../../../../tool/ui/StoreTool.js";
import * as StoreUtils$WonderEditor from "../../../../../../../src/core/utils/ui/StoreUtils.js";
import * as ArrayService$WonderEditor from "../../../../../../../src/service/atom/ArrayService.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as SceneGraphUtils$WonderEditor from "../../../../../../../src/core/composable_component/mainEditor/composable_component/left_components/composable_component/sceneTree/utils/SceneGraphUtils.js";
import * as SceneEngineService$WonderEditor from "../../../../../../../src/service/state/engine/SceneEngineService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../../leftHeader/tool/MainEditorLeftHeaderTool.js";

describe("test Store->SceneGraph", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.test("\n            1.add cube;\n\n            store->sceneGraphData should only has one cube\n            ", (function (param) {
                      var newGameObject = GameObjectTool$WonderEditor.getNewGameObjectUid(undefined, /* () */0);
                      var store = TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0);
                      MainEditorLeftHeaderTool$WonderEditor.addCube(store, undefined, /* () */0);
                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                      var __x = SceneGraphUtils$WonderEditor.buildTreeNode(newGameObject, engineState);
                      var store$1 = StoreTool$WonderEditor.setSceneGraphData(SceneGraphUtils$WonderEditor.addTreeNodeSceneGraphData(__x, SceneEngineService$WonderEditor.getSceneGameObject(engineState), StoreUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(store), engineState), store);
                      var match = ArrayService$WonderEditor.unsafeGetFirst(StoreTool$WonderEditor.unsafeGetSceneGraphData(store$1));
                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[/* children */3].length), 1);
                    }));
      }));

export {
  
}
/*  Not a pure module */
