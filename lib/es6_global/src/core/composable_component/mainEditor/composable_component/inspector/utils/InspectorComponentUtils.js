

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Color$WonderEditor from "../../../../../external/Color.js";
import * as TransformUtils$WonderEditor from "../composable_component/sceneTree_Inspector/atom_Inspector/transform/utils/TransformUtils.js";
import * as CameraEngineService$WonderEditor from "../../../../../../service/state/engine/CameraEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as SourceInstanceEngineService$WonderEditor from "../../../../../../service/state/engine/SourceInstanceEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectComponentEngineService.js";

function addComponentByType(type_, currentSceneTreeNode, engineState) {
  if (type_ === "sourceInstance") {
    var match = SourceInstanceEngineService$WonderEditor.create(engineState);
    return GameObjectComponentEngineService$WonderEditor.addSourceInstanceComponent(currentSceneTreeNode, match[1], match[0]);
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addComponentByType", "the type:" + (String(type_) + " is not find"), "", "", "type:" + (String(type_) + (" , currentSceneTreeNode:" + (String(currentSceneTreeNode) + "")))));
  }
}

function getCurrentGameObjectTransform(currentSceneTreeNode, engineStateToGetData) {
  if (currentSceneTreeNode) {
    return /* Some */[TransformUtils$WonderEditor.getCurrentTransformData(GameObjectComponentEngineService$WonderEditor.getTransformComponent(currentSceneTreeNode[0], engineStateToGetData))];
  } else {
    return /* None */0;
  }
}

function getCurrentGameObjectMap(currentSceneTreeNode, engineStateToGetData) {
  if (currentSceneTreeNode) {
    var gameObject = currentSceneTreeNode[0];
    var match = CameraEngineService$WonderEditor.isCamera(gameObject, engineStateToGetData);
    if (match) {
      return /* None */0;
    } else {
      return BasicMaterialEngineService$WonderEditor.getMap(GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent(gameObject, engineStateToGetData), engineStateToGetData);
    }
  } else {
    return /* None */0;
  }
}

function getCurrentGameObjectColor(currentSceneTreeNode, engineStateToGetData) {
  if (currentSceneTreeNode) {
    var gameObject = currentSceneTreeNode[0];
    var match = CameraEngineService$WonderEditor.isCamera(gameObject, engineStateToGetData);
    if (match) {
      return /* None */0;
    } else {
      return Color$WonderEditor.getHexString(BasicMaterialEngineService$WonderEditor.getColor(GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent(gameObject, engineStateToGetData), engineStateToGetData));
    }
  } else {
    return /* None */0;
  }
}

function getCurrentGameObjectName(currentSceneTreeNode, engineStateToGetData) {
  if (currentSceneTreeNode) {
    return /* Some */[GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(currentSceneTreeNode[0], engineStateToGetData)];
  } else {
    return /* None */0;
  }
}

export {
  addComponentByType ,
  getCurrentGameObjectTransform ,
  getCurrentGameObjectMap ,
  getCurrentGameObjectColor ,
  getCurrentGameObjectName ,
  
}
/* Log-WonderLog Not a pure module */
