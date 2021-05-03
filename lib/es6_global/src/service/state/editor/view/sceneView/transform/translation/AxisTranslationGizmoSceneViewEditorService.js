

import * as Vector3Service$Wonderjs from "../../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Vector3Service.js";
import * as ArrayService$WonderEditor from "../../../../../../atom/ArrayService.js";
import * as Vector3Service$WonderEditor from "../../../../../../primitive/Vector3Service.js";
import * as TransformEngineService$WonderEditor from "../../../../../engine/TransformEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../engine/gameObject/HierarchyGameObjectEngineService.js";
import * as OperateTranslationGizmoSceneViewEditorService$WonderEditor from "./OperateTranslationGizmoSceneViewEditorService.js";

function getAxisGizmoPos(editorState, engineState) {
  return TransformEngineService$WonderEditor.getPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationWholeGizmo(editorState), engineState), engineState);
}

function _getAxisNormalizedVec(translationAxisGizmo, param) {
  var engineState = param[1];
  return Vector3Service$WonderEditor.truncate(3, Vector3Service$Wonderjs.normalize(Vector3Service$Wonderjs.sub(/* Float */0, TransformEngineService$WonderEditor.getPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(ArrayService$WonderEditor.unsafeGetFirst(HierarchyGameObjectEngineService$WonderEditor.getChildren(translationAxisGizmo, engineState)), engineState), engineState), getAxisGizmoPos(param[0], engineState))));
}

function getXAxisNormalizedVec(editorState, engineState) {
  return _getAxisNormalizedVec(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXAxisGizmo(editorState), /* tuple */[
              editorState,
              engineState
            ]);
}

function getYAxisNormalizedVec(editorState, engineState) {
  return _getAxisNormalizedVec(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYAxisGizmo(editorState), /* tuple */[
              editorState,
              engineState
            ]);
}

function getZAxisNormalizedVec(editorState, engineState) {
  return _getAxisNormalizedVec(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationZAxisGizmo(editorState), /* tuple */[
              editorState,
              engineState
            ]);
}

export {
  getAxisGizmoPos ,
  _getAxisNormalizedVec ,
  getXAxisNormalizedVec ,
  getYAxisNormalizedVec ,
  getZAxisNormalizedVec ,
  
}
/* ArrayService-WonderEditor Not a pure module */
