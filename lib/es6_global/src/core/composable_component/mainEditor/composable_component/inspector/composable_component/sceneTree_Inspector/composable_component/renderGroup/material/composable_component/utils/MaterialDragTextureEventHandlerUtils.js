

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../../../../../../utils/ui/ConsoleUtils.js";
import * as GeometryService$WonderEditor from "../../../../../../../../../../../../service/primitive/geometry/GeometryService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as GeometryEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/GeometryEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as TextureNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/TextureNodeAssetService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

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

function handleSelfLogic(param, materialComponent, draggedNodeId, handleSetMapFunc) {
  var textureNode = OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(draggedNodeId, StateEditorService$WonderEditor.getState(/* () */0));
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var gameObject = SceneTreeEditorService$WonderEditor.getCurrentSceneTreeNode(editorState);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = TextureNodeAssetService$WonderEditor.getNodeData(textureNode);
  var textureComponent = match[/* textureComponent */0];
  var engineState$1 = gameObject !== undefined ? _handleGeometryAddMap(/* tuple */[
          GameObjectComponentEngineService$WonderEditor.getGeometryComponent(gameObject, engineState),
          materialComponent
        ], textureComponent, handleSetMapFunc, /* tuple */[
          editorState,
          engineState
        ]) : Curry._3(handleSetMapFunc, materialComponent, textureComponent, engineState);
  StateEngineService$WonderEditor.setState(engineState$1);
  return /* () */0;
}

export {
  _handleGeometryAddMap ,
  handleSelfLogic ,
  
}
/* ConsoleUtils-WonderEditor Not a pure module */
