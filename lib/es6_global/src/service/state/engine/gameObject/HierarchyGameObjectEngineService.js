

import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as GameObjectAPI$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as OptionService$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/OptionService.js";
import * as StateEditorService$WonderEditor from "../../editor/StateEditorService.js";
import * as TransformEngineService$WonderEditor from "../TransformEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "./GameObjectComponentEngineService.js";

var getAllChildrenTransform = GameObjectAPI$Wonderjs.getAllChildrenTransform;

var getAllGameObjects = GameObjectAPI$Wonderjs.getAllGameObjects;

function getAllChildren(rootGameObject, engineState) {
  return Contract$WonderLog.ensureCheck((function (allChildren) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("not contain itself", "contain"), (function (param) {
                              return Contract$WonderLog.assertFalse(allChildren.includes(rootGameObject));
                            }));
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0), GameObjectAPI$Wonderjs.getAllGameObjects(rootGameObject, engineState).slice(1));
}

function changeGameObjectChildOrder(sourceGameObject, targetGameObject, transformType, engineState) {
  var sourceTransform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(sourceGameObject, engineState);
  var targetTransform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(targetGameObject, engineState);
  var targetParentTransform = OptionService$Wonderjs.unsafeGet(TransformEngineService$WonderEditor.getParent(targetTransform, engineState));
  return TransformEngineService$WonderEditor.changeChildOrder(sourceTransform, targetTransform, targetParentTransform, transformType, engineState);
}

function setParentKeepOrder(parent, child, engineState) {
  return TransformEngineService$WonderEditor.setParentKeepOrder(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(parent, engineState), GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(child, engineState), engineState);
}

function getParentTransform(child, engineState) {
  return TransformEngineService$WonderEditor.getParent(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(child, engineState), engineState);
}

function getParentGameObject(child, engineState) {
  return Js_option.map((function (parentTransform) {
                return TransformEngineService$WonderEditor.getGameObjectByTransform(parentTransform, engineState);
              }), getParentTransform(child, engineState));
}

function addChild(parent, child, engineState) {
  return TransformEngineService$WonderEditor.setParent(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(parent, engineState), GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(child, engineState), engineState);
}

function getChildren(gameObject, engineState) {
  return TransformEngineService$WonderEditor.getChildren(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState).map((function (transform) {
                return TransformEngineService$WonderEditor.getGameObjectByTransform(transform, engineState);
              }));
}

function hasChildren(gameObject, engineState) {
  return getChildren(gameObject, engineState).length > 0;
}

function findGameObjectByUid(uid, parentGameObject, engineState) {
  return Caml_option.undefined_to_opt(GameObjectAPI$Wonderjs.getAllGameObjects(parentGameObject, engineState).find((function (gameObject) {
                    return gameObject === uid;
                  })));
}

export {
  getAllChildrenTransform ,
  getAllGameObjects ,
  getAllChildren ,
  changeGameObjectChildOrder ,
  setParentKeepOrder ,
  getParentTransform ,
  getParentGameObject ,
  addChild ,
  getChildren ,
  hasChildren ,
  findGameObjectByUid ,
  
}
/* Log-WonderLog Not a pure module */
