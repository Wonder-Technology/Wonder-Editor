

import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GameObjectEngineService$WonderEditor from "../../../state/engine/gameObject/GameObjectEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as ContainerGameObjectInspectorCanvasEditorService$WonderEditor from "../../../state/editor/inspectorCanvas/ContainerGameObjectInspectorCanvasEditorService.js";

function _disposeContainerGameObjectAllChildrenRemoveTexture(containerGameObject, inspectorEngineState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (inspectorEngineState, gameObject) {
                return GameObjectEngineService$WonderEditor.disposeGameObjectRemoveTexture(gameObject, inspectorEngineState);
              }), inspectorEngineState, HierarchyGameObjectEngineService$WonderEditor.getAllChildren(containerGameObject, inspectorEngineState));
}

function disposeInspectorEngineContainerGameObjectAllChildren(param) {
  var inspectorEngineState = param[1];
  var containerGameObject = ContainerGameObjectInspectorCanvasEditorService$WonderEditor.getContainerGameObject(param[0]);
  if (containerGameObject !== undefined) {
    return _disposeContainerGameObjectAllChildrenRemoveTexture(containerGameObject, inspectorEngineState);
  } else {
    return inspectorEngineState;
  }
}

function _getContainerGameObjectFirstChild(param) {
  var containerGameObject = ContainerGameObjectInspectorCanvasEditorService$WonderEditor.unsafeGetContainerGameObject(param[0]);
  return ArrayService$WonderEditor.getFirst(HierarchyGameObjectEngineService$WonderEditor.getChildren(containerGameObject, param[1]));
}

var getMaterialSphere = _getContainerGameObjectFirstChild;

var getWDBGameObject = _getContainerGameObjectFirstChild;

export {
  _disposeContainerGameObjectAllChildrenRemoveTexture ,
  disposeInspectorEngineContainerGameObjectAllChildren ,
  _getContainerGameObjectFirstChild ,
  getMaterialSphere ,
  getWDBGameObject ,
  
}
/* ArrayService-WonderEditor Not a pure module */
