

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as UIStateService$WonderEditor from "../../../../../../service/state/ui/UIStateService.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../service/state/engine/state/StateEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../service/state/engine/TransformEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

function getCurrentSceneTreeNodePosition(editorState, engineState) {
  return TransformEngineService$WonderEditor.getPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState), engineState), engineState);
}

function getCurrentSceneTreeNodeLocalPosition(editorState, engineState) {
  return TransformEngineService$WonderEditor.getLocalPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState), engineState), engineState);
}

function getCurrentSceneTreeNodeLocalEulerAngles(editorState, engineState) {
  return TransformEngineService$WonderEditor.getLocalEulerAngles(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState), engineState), engineState);
}

function getCurrentSceneTreeNodeEulerAngles(editorState, engineState) {
  return TransformEngineService$WonderEditor.getEulerAngles(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState), engineState), engineState);
}

function getCurrentSceneTreeNodeLocalScale(editorState, engineState) {
  return TransformEngineService$WonderEditor.getLocalScale(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState), engineState), engineState);
}

function pushUndoStack(startData, pushUndoStackWithCopiedEngineStateFunc, editorState, engineState) {
  var currentSceneTreeNode = SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState);
  var transform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(currentSceneTreeNode, engineState);
  StateEditorService$WonderEditor.setState(editorState);
  StateEngineService$WonderEditor.setState(engineState);
  Curry._3(pushUndoStackWithCopiedEngineStateFunc, /* tuple */[
        UIStateService$WonderEditor.getState(/* () */0),
        UIStateService$WonderEditor.getDispatch(/* () */0)
      ], transform, startData);
  return StateEngineService$WonderEditor.unsafeGetState(/* () */0);
}

export {
  getCurrentSceneTreeNodePosition ,
  getCurrentSceneTreeNodeLocalPosition ,
  getCurrentSceneTreeNodeLocalEulerAngles ,
  getCurrentSceneTreeNodeEulerAngles ,
  getCurrentSceneTreeNodeLocalScale ,
  pushUndoStack ,
  
}
/* UIStateService-WonderEditor Not a pure module */
