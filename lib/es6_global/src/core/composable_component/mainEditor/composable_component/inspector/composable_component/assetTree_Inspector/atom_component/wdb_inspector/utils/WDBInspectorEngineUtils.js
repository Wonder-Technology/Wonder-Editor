

import * as FocusUtils$WonderEditor from "../../../../../../../../../utils/engine/job/init/initHotKeysJob/FocusUtils.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as CloneGameObjectLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/engine/CloneGameObjectLogicService.js";
import * as GameObjectInspectorEngineService$WonderEditor from "../../../../../../../../../../service/state/inspectorEngine/GameObjectInspectorEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as ContainerGameObjectInspectorCanvasEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/inspectorCanvas/ContainerGameObjectInspectorCanvasEditorService.js";

function _iterateCreateNewWDBGameObject(gameObject, editorState, engineState, inspectorEngineState) {
  var match = CloneGameObjectLogicService$WonderEditor.cloneGameObjectToOtherEngineState(gameObject, editorState, engineState, inspectorEngineState);
  var editorState$1 = match[1];
  var newGameObject = match[0];
  var inspectorEngineState$1 = GameObjectEngineService$WonderEditor.initGameObject(newGameObject, match[2]);
  var match$1 = HierarchyGameObjectEngineService$WonderEditor.hasChildren(gameObject, engineState);
  if (match$1) {
    return HierarchyGameObjectEngineService$WonderEditor.getChildren(gameObject, engineState).reduce((function (param, gameObjectChild) {
                  var newGameObject = param[0];
                  var match = _iterateCreateNewWDBGameObject(gameObjectChild, param[1], engineState, param[2]);
                  var inspectorEngineState = HierarchyGameObjectEngineService$WonderEditor.addChild(newGameObject, match[0], match[2]);
                  return /* tuple */[
                          newGameObject,
                          match[1],
                          inspectorEngineState
                        ];
                }), /* tuple */[
                newGameObject,
                editorState$1,
                inspectorEngineState$1
              ]);
  } else {
    return /* tuple */[
            newGameObject,
            editorState$1,
            inspectorEngineState$1
          ];
  }
}

function setCameraFocusWDBGameObject(newWDBGameObject, inspectorEngineState) {
  var camera = GameObjectInspectorEngineService$WonderEditor.unsafeGetCamera(inspectorEngineState);
  return FocusUtils$WonderEditor.setCameraFocusTargetGameObject(camera, newWDBGameObject, 1.9, inspectorEngineState);
}

function createWDBIntoInspectorCanvas(wdbGameObject, editorState, engineState, inspectorEngineState) {
  var containerGameObject = ContainerGameObjectInspectorCanvasEditorService$WonderEditor.unsafeGetContainerGameObject(editorState);
  var match = _iterateCreateNewWDBGameObject(wdbGameObject, editorState, engineState, inspectorEngineState);
  var inspectorEngineState$1 = match[2];
  var newWDBGameObject = match[0];
  HierarchyGameObjectEngineService$WonderEditor.addChild(containerGameObject, newWDBGameObject, inspectorEngineState$1);
  return /* tuple */[
          newWDBGameObject,
          match[1],
          inspectorEngineState$1
        ];
}

export {
  _iterateCreateNewWDBGameObject ,
  setCameraFocusWDBGameObject ,
  createWDBIntoInspectorCanvas ,
  
}
/* FocusUtils-WonderEditor Not a pure module */
