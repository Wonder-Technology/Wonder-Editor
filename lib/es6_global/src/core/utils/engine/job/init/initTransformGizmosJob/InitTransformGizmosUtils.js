

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

export {
  getCurrentSceneTreeNodePosition ,
  getCurrentSceneTreeNodeLocalPosition ,
  getCurrentSceneTreeNodeLocalEulerAngles ,
  getCurrentSceneTreeNodeEulerAngles ,
  getCurrentSceneTreeNodeLocalScale ,
  
}
/* SceneTreeEditorService-WonderEditor Not a pure module */
