

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Index from "antd/lib/message/index";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as GameObjectLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/GameObjectLogicService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/GameObjectEngineService.js";
import * as PointLightEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/PointLightEngineService.js";
import * as DirectionLightEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/DirectionLightEngineService.js";
import * as OperatePointLightLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/OperatePointLightLogicService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/GameObjectComponentEngineService.js";
import * as OperateLightMaterialLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/OperateLightMaterialLogicService.js";
import * as OperateDirectionLightLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/OperateDirectionLightLogicService.js";

function getLightOptions() {
  return /* array */[
          /* record */[
            /* key : DirectionLight */0,
            /* value */"direction_light"
          ],
          /* record */[
            /* key : PointLight */1,
            /* value */"point_light"
          ]
        ];
}

function getLightTypeByGameObject(gameObject, engineState) {
  var match = GameObjectComponentEngineService$WonderEditor.hasDirectionLightComponent(gameObject, engineState);
  var match$1 = GameObjectComponentEngineService$WonderEditor.hasPointLightComponent(gameObject, engineState);
  var exit = 0;
  if (match) {
    if (match$1) {
      exit = 1;
    } else {
      return /* DirectionLight */0;
    }
  } else if (match$1) {
    return /* PointLight */1;
  } else {
    exit = 1;
  }
  if (exit === 1) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getLightTypeByGameObject", "gameObject:" + (String(gameObject) + " should has light component"), "", "", ""));
  }
  
}

function handleSpecificFuncByLightType(lightType, param) {
  var currentSceneTreeNode = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  if (lightType) {
    return Curry._1(param[1], currentSceneTreeNode);
  } else {
    return Curry._1(param[0], currentSceneTreeNode);
  }
}

function _isLightExceedMaxCountByType(targetLightType, engineState) {
  if (targetLightType) {
    return /* tuple */[
            "the point light count is exceed max count !",
            PointLightEngineService$WonderEditor.isMaxCount(engineState)
          ];
  } else {
    return /* tuple */[
            "the point light count is exceed max count !",
            DirectionLightEngineService$WonderEditor.isMaxCount(engineState)
          ];
  }
}

function _getOperateSourceLightFunc(lightType, gameObject, engineStateToGetData) {
  if (lightType) {
    return /* tuple */[
            GameObjectComponentEngineService$WonderEditor.getPointLightComponent(gameObject, engineStateToGetData),
            OperatePointLightLogicService$WonderEditor.disposePointLight
          ];
  } else {
    return /* tuple */[
            GameObjectComponentEngineService$WonderEditor.getDirectionLightComponent(gameObject, engineStateToGetData),
            OperateDirectionLightLogicService$WonderEditor.disposeDirectionLight
          ];
  }
}

function _getOperateTargetLightFunc(lightType, editEngineState, runEngineState) {
  if (lightType) {
    return /* tuple */[
            OperatePointLightLogicService$WonderEditor.createPointLight(editEngineState, runEngineState),
            OperatePointLightLogicService$WonderEditor.addPointLight
          ];
  } else {
    return /* tuple */[
            OperateDirectionLightLogicService$WonderEditor.createDirectionLight(editEngineState, runEngineState),
            OperateDirectionLightLogicService$WonderEditor.addDirectionLight
          ];
  }
}

function replaceLightByType(sourceLightType, targetLightType) {
  var gameObject = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  var editEngineState = StateLogicService$WonderEditor.getEditEngineState(/* () */0);
  var runEngineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
  var match = _isLightExceedMaxCountByType(targetLightType, runEngineState);
  if (match[1]) {
    var messageObj = Index.default;
    messageObj.warn(match[0], 4);
    return /* () */0;
  } else {
    var match$1 = _getOperateSourceLightFunc(sourceLightType, gameObject, runEngineState);
    var match$2 = _getOperateTargetLightFunc(targetLightType, editEngineState, runEngineState);
    var match$3 = match$2[0];
    var match$4 = StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[/* record */[
            /* arguments : array */[gameObject],
            /* type_ : GameObject */0
          ]], GameObjectEngineService$WonderEditor.initGameObject, Curry._3(match$2[1], gameObject, match$3[0], Curry._3(match$1[1], gameObject, match$1[0], /* tuple */[
                  match$3[1],
                  match$3[2]
                ])));
    StateLogicService$WonderEditor.refreshEditAndRunEngineState(match$4[0], match$4[1]);
    StateLogicService$WonderEditor.getAndSetEditAndRunEngineState(OperateLightMaterialLogicService$WonderEditor.reInitAllMaterials);
    return StateLogicService$WonderEditor.getAndRefreshEditAndRunEngineState(/* () */0);
  }
}

function disposeLightByLightTypeForEditEngineState(lightType, currentSceneTreeNode, engineState) {
  if (lightType) {
    return GameObjectLogicService$WonderEditor.disposePointLightForEditEngineState(currentSceneTreeNode, GameObjectComponentEngineService$WonderEditor.getPointLightComponent(currentSceneTreeNode, engineState), engineState);
  } else {
    return GameObjectLogicService$WonderEditor.disposeDirectionLightForEditEngineState(currentSceneTreeNode, GameObjectComponentEngineService$WonderEditor.getDirectionLightComponent(currentSceneTreeNode, engineState), engineState);
  }
}

function disposeLightByLightTypeForRunEngineState(lightType, currentSceneTreeNode, param) {
  var engineState = param[1];
  var editorState = param[0];
  if (lightType) {
    return GameObjectLogicService$WonderEditor.disposePointLightForRunEngineState(currentSceneTreeNode, GameObjectComponentEngineService$WonderEditor.getPointLightComponent(currentSceneTreeNode, engineState), /* tuple */[
                editorState,
                engineState
              ]);
  } else {
    return GameObjectLogicService$WonderEditor.disposeDirectionLightForRunEngineState(currentSceneTreeNode, GameObjectComponentEngineService$WonderEditor.getDirectionLightComponent(currentSceneTreeNode, engineState), /* tuple */[
                editorState,
                engineState
              ]);
  }
}

export {
  getLightOptions ,
  getLightTypeByGameObject ,
  handleSpecificFuncByLightType ,
  _isLightExceedMaxCountByType ,
  _getOperateSourceLightFunc ,
  _getOperateTargetLightFunc ,
  replaceLightByType ,
  disposeLightByLightTypeForEditEngineState ,
  disposeLightByLightTypeForRunEngineState ,
  
}
/* Log-WonderLog Not a pure module */
