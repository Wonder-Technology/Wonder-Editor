

import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as MaterialNodeMapAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/MaterialNodeMapAssetEditorService.js";

function getMaterialComponent(nodeId, $staropt$star, _) {
  if ($staropt$star === undefined) {
    StateEditorService$WonderEditor.getState(/* () */0);
  }
  return MaterialNodeMapAssetEditorService$WonderEditor.unsafeGetResult(nodeId, StateEditorService$WonderEditor.getState(/* () */0))[/* materialComponent */2];
}

function hasMaterialComponent(material, materialType, editorState) {
  return Js_option.isSome(Js_primitive.undefined_to_opt(MaterialNodeMapAssetEditorService$WonderEditor.getValidValues(editorState).find((function (param) {
                        if (param[/* materialComponent */2] === material) {
                          return materialType === param[/* type_ */1];
                        } else {
                          return false;
                        }
                      }))));
}

function findNodeIdByMaterialComponent(material, materialType, editorState) {
  var match = MaterialNodeMapAssetEditorService$WonderEditor.getResults(editorState).find((function (param) {
          var match = param[1];
          if (match[/* materialComponent */2] === material) {
            return materialType === match[/* type_ */1];
          } else {
            return false;
          }
        }));
  if (match !== undefined) {
    return match[0];
  }
  
}

export {
  getMaterialComponent ,
  hasMaterialComponent ,
  findNodeIdByMaterialComponent ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
