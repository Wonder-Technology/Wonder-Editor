

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../ui/store/AppStore.js";
import * as SceneUtils$WonderEditor from "../../../utils/engine/SceneUtils.js";
import * as StoreUtils$WonderEditor from "../../../utils/ui/StoreUtils.js";
import * as EventHandler$WonderEditor from "../../../ui/eventHandler/EventHandler.js";
import * as SceneGraphUtils$WonderEditor from "../../mainEditor/composable_component/left_components/composable_component/sceneTree/utils/SceneGraphUtils.js";
import * as EmptyEventHandler$WonderEditor from "../../../ui/eventHandler/EmptyEventHandler.js";
import * as SceneEngineService$WonderEditor from "../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../service/state/engine/StateEngineService.js";
import * as PrimitiveEngineService$WonderEditor from "../../../../service/state/engine/PrimitiveEngineService.js";
import * as GeometryDataAssetEditorService$WonderEditor from "../../../../service/state/editor/asset/GeometryDataAssetEditorService.js";
import * as MaterialDataAssetEditorService$WonderEditor from "../../../../service/state/editor/asset/MaterialDataAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, type_, _) {
  var dispatchFunc = param[1];
  var newGameObject;
  if (type_) {
    newGameObject = SceneUtils$WonderEditor.addGameObject(PrimitiveEngineService$WonderEditor.createEmptyGameObject);
  } else {
    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
    var defaultCubeGeometry = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultCubeGeometryComponent(editorState);
    var defaultLightMaterial = MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultLightMaterial(editorState);
    var partial_arg = /* tuple */[
      defaultCubeGeometry,
      defaultLightMaterial
    ];
    newGameObject = SceneUtils$WonderEditor.addGameObject((function (param, param$1) {
            return PrimitiveEngineService$WonderEditor.createCube(partial_arg, param, param$1);
          }));
  }
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var __x = SceneGraphUtils$WonderEditor.buildTreeNode(newGameObject, engineState);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.SceneTreeAction,
        /* SetSceneGraph */[SceneGraphUtils$WonderEditor.addTreeNodeSceneGraphData(__x, SceneEngineService$WonderEditor.getSceneGameObject(engineState), StoreUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(param[0]), engineState)]
      ]);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* SceneTree */6]]
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
