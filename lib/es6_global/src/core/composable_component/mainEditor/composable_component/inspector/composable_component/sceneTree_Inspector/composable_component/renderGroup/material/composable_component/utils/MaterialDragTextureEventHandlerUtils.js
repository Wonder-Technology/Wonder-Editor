

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../ui/store/AppStore.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../../../../../../utils/ui/ConsoleUtils.js";
import * as GeometryService$WonderEditor from "../../../../../../../../../../../../service/primitive/geometry/GeometryService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as GeometryEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/GeometryEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/GameObjectComponentEngineService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/TextureNodeMapAssetEditorService.js";

function _handleGeometryAddMap(param, textureComponent, handleSetMapFunc, param$1) {
  var engineState = param$1[1];
  var materialComponent = param[1];
  var geometryComponent = param[0];
  if (geometryComponent !== undefined && !GeometryService$WonderEditor.hasTexCoords(GeometryEngineService$WonderEditor.getGeometryTexCoords(geometryComponent, engineState))) {
    ConsoleUtils$WonderEditor.warn("the geometry:" + (String(geometryComponent) + " have no texCoords"), param$1[0]);
    return engineState;
  } else {
    return Curry._3(handleSetMapFunc, materialComponent, textureComponent, engineState);
  }
}

function handleSelfLogic(param, materialComponent, dragedNodeId, handleSetMapFunc) {
  var param$1 = SparseMapService$WonderCommonlib.unsafeGet(dragedNodeId, TextureNodeMapAssetEditorService$WonderEditor.getTextureNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
  var textureComponent = param$1[/* textureComponent */0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var gameObject = SceneEditorService$WonderEditor.getCurrentSceneTreeNode(editorState);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var engineState$1 = gameObject !== undefined ? _handleGeometryAddMap(/* tuple */[
          GameObjectComponentEngineService$WonderEditor.getGeometryComponent(gameObject, engineState),
          materialComponent
        ], textureComponent, handleSetMapFunc, /* tuple */[
          editorState,
          engineState
        ]) : Curry._3(handleSetMapFunc, materialComponent, textureComponent, engineState);
  StateEngineService$WonderEditor.setState(engineState$1);
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[
            /* Project */4,
            /* Inspector */2
          ]]
      ]);
  return /* () */0;
}

export {
  _handleGeometryAddMap ,
  handleSelfLogic ,
  
}
/* AppStore-WonderEditor Not a pure module */
