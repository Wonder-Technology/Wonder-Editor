

import * as Curry from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as PickColorTool$WonderEditor from "../../../../../../../../../tool/PickColorTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../../../../../unit/tool/EventListenerTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../../../../tool/MainEditorSceneTool.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../../../../src/service/state/engine/BasicMaterialEngineService.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../../../../../../tool/BuildComponentForCurryTool.js";
import * as MainEditorBasicMaterialTool$WonderEditor from "../../../tool/MainEditorBasicMaterialTool.js";

describe("MainEditorBasicMaterial component", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set currentSceneTreeNode", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                        return MainEditorBasicMaterialTool$WonderEditor.changeMaterialTypeToBeBasicMaterial(undefined, undefined, /* () */0);
                      }));
                return PickColorTool$WonderEditor.testOperateColorPickToChangeColor(sandbox, BuildComponentForCurryTool$WonderEditor.buildBasicMaterial, /* tuple */[
                            GameObjectTool$WonderEditor.getCurrentSceneTreeNodeBasicMaterial,
                            MainEditorBasicMaterialTool$WonderEditor.changeColor,
                            BasicMaterialEngineService$WonderEditor.getColor
                          ]);
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
