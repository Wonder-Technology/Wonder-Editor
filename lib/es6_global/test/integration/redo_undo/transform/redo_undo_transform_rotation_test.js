

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../tool/GameObjectTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as MainEditorTransformTool$WonderEditor from "../../inspector/composable_component/sceneTree_inspector/transform/tool/MainEditorTransformTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../tool/BuildComponentForCurryTool.js";

describe("redo_undo: transform rotation", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("fix bug", (function () {
                Wonder_jest.test("\n            set current scene tree node to c1;\n            change c1->local euler angles;\n            undo;\n\n            ui->inspector->transform->c1->local euler angles should be (0,0,0);\n            ", (function () {
                        var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                        MainEditorTransformTool$WonderEditor.changeRotationYAndBlur(10.0, currentGameObjectTransform, undefined, undefined, /* () */0);
                        RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentForCurryTool$WonderEditor.buildMainEditorTransformComponent(/* () */0));
                      }));
                return Wonder_jest.test("\n            set current scene tree node to c1;\n            change c1->local euler angles;\n            undo;\n\n            ui->inspector->transform->c1->local euler angles should be (0,0,0);\n            ", (function () {
                              var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                              MainEditorTransformTool$WonderEditor.changeRotationYAndBlur(10.0, currentGameObjectTransform, undefined, undefined, /* () */0);
                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentForCurryTool$WonderEditor.buildMainEditorTransformComponent(/* () */0));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
