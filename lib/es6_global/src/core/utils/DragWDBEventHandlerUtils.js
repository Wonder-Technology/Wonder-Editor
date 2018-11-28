

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../ui/store/AppStore.js";
import * as DragWDBUtils$WonderEditor from "./DragWDBUtils.js";
import * as SceneGraphUtils$WonderEditor from "../composable_component/mainEditor/composable_component/left_components/composable_component/sceneTree/utils/SceneGraphUtils.js";
import * as StateEditorService$WonderEditor from "../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../service/state/engine/StateEngineService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function handleSelfLogic(param, _, param$1) {
  var targetGameObjectUid = param$1[0];
  var dispatchFunc = param[1];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var isShowChildrenMap = SparseMapService$WonderCommonlib.set(targetGameObjectUid, true, SceneGraphUtils$WonderEditor.buildIsShowChildrenMapFromStore(param[0]));
  var match = DragWDBUtils$WonderEditor.dragWDB(param$1[1], targetGameObjectUid, /* tuple */[
        editorState,
        engineState
      ]);
  var match$1 = match[1];
  var engineState$1 = match$1[1];
  var editorState$1 = match$1[0];
  if (match[0]) {
    Curry._1(dispatchFunc, [
          AppStore$WonderEditor.SceneTreeAction,
          /* SetSceneGraph */[SceneGraphUtils$WonderEditor.setIsShowChildrenByMap(isShowChildrenMap, SceneGraphUtils$WonderEditor.getSceneGraphDataFromEngine(/* tuple */[
                      editorState$1,
                      engineState$1
                    ]))]
        ]);
    Curry._1(dispatchFunc, [
          AppStore$WonderEditor.UpdateAction,
          /* Update */[/* array */[/* SceneTree */6]]
        ]);
  }
  StateEditorService$WonderEditor.setState(editorState$1);
  StateEngineService$WonderEditor.setState(engineState$1);
  return /* () */0;
}

export {
  handleSelfLogic ,
  
}
/* AppStore-WonderEditor Not a pure module */
