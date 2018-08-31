

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../ui/store/AppStore.js";
import * as SceneUtils$WonderEditor from "../../../utils/engine/SceneUtils.js";
import * as StoreUtils$WonderEditor from "../../../utils/ui/StoreUtils.js";
import * as EventHandler$WonderEditor from "../../../ui/eventHandler/EventHandler.js";
import * as SceneTreeUtils$WonderEditor from "../../mainEditor/composable_component/sceneTree/utils/SceneTreeUtils.js";
import * as EmptyEventHandler$WonderEditor from "../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as PrimitiveEngineService$WonderEditor from "../../../../service/state/engine/PrimitiveEngineService.js";
import * as AssetGeometryDataEditorService$WonderEditor from "../../../../service/state/editor/asset/AssetGeometryDataEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, type_, _) {
  var dispatchFunc = param[1];
  var newGameObject;
  if (type_) {
    newGameObject = SceneUtils$WonderEditor.addGameObject(PrimitiveEngineService$WonderEditor.createEmptyGameObjectForEditEngineState, PrimitiveEngineService$WonderEditor.createEmptyGameObjectForRunEngineState);
  } else {
    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
    var param$1 = AssetGeometryDataEditorService$WonderEditor.getGeometryData(editorState);
    var runCubeGeometry = param$1[/* defaultCubeGeometryIndex */0];
    var partial_arg = StateLogicService$WonderEditor.getEditEngineComponent(/* Geometry */2, runCubeGeometry);
    newGameObject = SceneUtils$WonderEditor.addGameObject((function (param) {
            return PrimitiveEngineService$WonderEditor.createBoxForEditEngineState(partial_arg, param);
          }), (function (param, param$1) {
            return PrimitiveEngineService$WonderEditor.createBoxForRunEngineState(runCubeGeometry, param, param$1);
          }));
  }
  var partial_arg$1 = StoreUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(param[0]);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.SceneTreeAction,
        /* SetSceneGraph */[StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                  return SceneTreeUtils$WonderEditor.buildSceneGraphDataWithNewGameObject(newGameObject, partial_arg$1, param);
                }))]
      ]);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* SceneTree */3]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* handleSelfLogic */handleSelfLogic
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      handleSelfLogic,
      setUndoValueToCopiedEngineState
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
