

import * as Js_option from "../../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as OptionService$WonderEditor from "../../../../../../primitive/OptionService.js";
import * as RecordTransformGizmoSceneViewEditorService$WonderEditor from "../RecordTransformGizmoSceneViewEditorService.js";

function getData(editorState) {
  return Js_option.andThen((function (data) {
                return data[/* rotationGizmoData */3];
              }), RecordTransformGizmoSceneViewEditorService$WonderEditor.getData(editorState));
}

function unsafeGetData(editorState) {
  return OptionService$WonderEditor.unsafeGet(getData(editorState));
}

export {
  getData ,
  unsafeGetData ,
  
}
/* OptionService-WonderEditor Not a pure module */
