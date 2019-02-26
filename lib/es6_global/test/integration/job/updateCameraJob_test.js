

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as MainUtils$WonderEditor from "../../../src/core/utils/engine/MainUtils.js";
import * as GameObjectTool$WonderEditor from "../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as DirectorToolEngine$WonderEditor from "../../tool/engine/DirectorToolEngine.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as TransformGameObjectEngineService$WonderEditor from "../../../src/service/state/engine/gameObject/TransformGameObjectEngineService.js";
import * as ArcballCameraControllerToolEngine$WonderEditor from "../../tool/engine/ArcballCameraControllerToolEngine.js";
import * as MainEditorInspectorAddComponentTool$WonderEditor from "../inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js";

describe("update camera job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareState = function () {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n{\"name\": \"update_camera\" }\n           ]\n         }\n       ]\n             ", undefined, undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("update all arcballCameraControllers", (function () {
                return Wonder_jest.test("update undirty ones", (function () {
                              _prepareState(/* () */0);
                              StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                              MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                              StateLogicService$WonderEditor.getAndSetEngineState(ArcballCameraControllerToolEngine$WonderEditor.clearDirtyArray);
                              var partial_arg = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                              StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                      return TransformGameObjectEngineService$WonderEditor.setLocalPosition(partial_arg, /* tuple */[
                                                  0,
                                                  0,
                                                  0
                                                ], param);
                                    }));
                              StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                              var partial_arg$1 = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* <> */6], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                    return TransformGameObjectEngineService$WonderEditor.getLocalPosition(partial_arg$1, param);
                                                  }))), /* tuple */[
                                          0,
                                          0,
                                          0
                                        ]);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
