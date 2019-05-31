

import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GameObjectEngineService$WonderEditor from "../../../state/engine/gameObject/GameObjectEngineService.js";
import * as RenderGroupEngineService$WonderEditor from "../../../state/engine/RenderGroupEngineService.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../../../core/composable_component/mainEditor/composable_component/inspector/utils/InspectorRenderGroupUtils.js";
import * as CloneValueEngineLogicService$WonderEditor from "./CloneValueEngineLogicService.js";
import * as CloneGeometryEngineLogicService$WonderEditor from "./CloneGeometryEngineLogicService.js";
import * as CloneTransformEngineLogicService$WonderEditor from "./CloneTransformEngineLogicService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../state/engine/gameObject/GameObjectComponentEngineService.js";
import * as CloneRenderGroupEngineLogicService$WonderEditor from "./CloneRenderGroupEngineLogicService.js";

var getAllClonedGameObjectArr = ArrayService$WonderCommonlib.flatten;

function getClonedGameObject(clonedGameObjectArr) {
  return ArrayService$WonderEditor.unsafeGetFirst(ArrayService$WonderCommonlib.flatten(clonedGameObjectArr));
}

function _cloneGameObjectTransform(newGameObject, param, targetEngineState) {
  var clonedEngineState = param[1];
  var clonedGameObjectTransform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(param[0], clonedEngineState);
  var targetGameObjectTransform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(newGameObject, targetEngineState);
  return CloneTransformEngineLogicService$WonderEditor.cloneTransformToOtherEngineState(targetGameObjectTransform, /* tuple */[
              clonedGameObjectTransform,
              clonedEngineState
            ], targetEngineState);
}

function _cloneGameObjectRenderGroupIfExist(newGameObject, param, editorState, targetEngineState) {
  var clonedEngineState = param[1];
  var clonedGameObject = param[0];
  var match = InspectorRenderGroupUtils$WonderEditor.hasRenderGroupComponents(clonedGameObject, clonedEngineState);
  if (match) {
    var match$1 = CloneRenderGroupEngineLogicService$WonderEditor.cloneRenderGroupToOtherEngineState(newGameObject, /* tuple */[
          clonedGameObject,
          clonedEngineState
        ], editorState, targetEngineState);
    return /* tuple */[
            match$1[2],
            RenderGroupEngineService$WonderEditor.addRenderGroupComponents(newGameObject, match$1[0], /* tuple */[
                  GameObjectComponentEngineService$WonderEditor.addMeshRendererComponent,
                  match$1[1]
                ], match$1[3])
          ];
  } else {
    return /* tuple */[
            editorState,
            targetEngineState
          ];
  }
}

function _cloneGameObjectGeometryIfExist(newGameObject, param, targetEngineState) {
  var clonedEngineState = param[1];
  var clonedGameObject = param[0];
  var match = GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(clonedGameObject, clonedEngineState);
  if (match) {
    var match$1 = CloneGeometryEngineLogicService$WonderEditor.cloneGeometryToOtherEngineState(newGameObject, /* tuple */[
          clonedGameObject,
          clonedEngineState
        ], targetEngineState);
    return GameObjectComponentEngineService$WonderEditor.addGeometryComponent(newGameObject, match$1[0], match$1[1]);
  } else {
    return targetEngineState;
  }
}

function cloneGameObjectToOtherEngineState(clonedGameObject, editorState, clonedEngineState, targetEngineState) {
  var match = GameObjectEngineService$WonderEditor.create(targetEngineState);
  var newGameObject = match[1];
  var match$1 = _cloneGameObjectRenderGroupIfExist(newGameObject, /* tuple */[
        clonedGameObject,
        clonedEngineState
      ], editorState, _cloneGameObjectTransform(newGameObject, /* tuple */[
            clonedGameObject,
            clonedEngineState
          ], CloneValueEngineLogicService$WonderEditor.cloneValueByGetOptionValueFunc(GameObjectEngineService$WonderEditor.getGameObjectName, GameObjectEngineService$WonderEditor.setGameObjectName, newGameObject, /* tuple */[
                clonedGameObject,
                clonedEngineState
              ], match[0])));
  var targetEngineState$1 = _cloneGameObjectGeometryIfExist(newGameObject, /* tuple */[
        clonedGameObject,
        clonedEngineState
      ], match$1[1]);
  return /* tuple */[
          newGameObject,
          match$1[0],
          targetEngineState$1
        ];
}

export {
  getAllClonedGameObjectArr ,
  getClonedGameObject ,
  _cloneGameObjectTransform ,
  _cloneGameObjectRenderGroupIfExist ,
  _cloneGameObjectGeometryIfExist ,
  cloneGameObjectToOtherEngineState ,
  
}
/* ArrayService-WonderEditor Not a pure module */
