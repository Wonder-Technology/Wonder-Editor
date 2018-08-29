

import * as Caml_obj from "../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as SceneEditorService$WonderEditor from "../../state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";
import * as DiffComponentService$WonderEditor from "../../record/editor/scene/DiffComponentService.js";

function checkEditAndRunRenderGroupWithDiff(param, editEngineState, runEngineState) {
  var runRenderGroup = param[1];
  var editRenderGroup = param[0];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("editMateral and runRenderGroup diff should == meshRender material diff value", "not"), (function () {
                        var _getDiffValueByType = function (type_) {
                          return DiffComponentService$WonderEditor.getEditEngineComponent(type_, SceneEditorService$WonderEditor.unsafeGetDiffMap(StateEditorService$WonderEditor.getState(/* () */0)));
                        };
                        var meshRendererDiffValue = _getDiffValueByType(/* MeshRenderer */3);
                        var basicMaterialDiffValue = _getDiffValueByType(/* BasicMaterial */4);
                        var lightMaterialDiffValue = _getDiffValueByType(/* LightMaterial */5);
                        var _getRenderGroupDiffValue = function () {
                          return /* tuple */[
                                  editRenderGroup[/* meshRenderer */0] - runRenderGroup[/* meshRenderer */0] | 0,
                                  editRenderGroup[/* material */1] - runRenderGroup[/* material */1] | 0
                                ];
                        };
                        if (Caml_obj.caml_equal(_getRenderGroupDiffValue(/* () */0), /* tuple */[
                                meshRendererDiffValue,
                                basicMaterialDiffValue
                              ])) {
                          return true;
                        } else {
                          return Caml_obj.caml_equal(_getRenderGroupDiffValue(/* () */0), /* tuple */[
                                      meshRendererDiffValue,
                                      lightMaterialDiffValue
                                    ]);
                        }
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return /* tuple */[
          runRenderGroup,
          editEngineState,
          runEngineState
        ];
}

export {
  checkEditAndRunRenderGroupWithDiff ,
  
}
/* Log-WonderLog Not a pure module */
