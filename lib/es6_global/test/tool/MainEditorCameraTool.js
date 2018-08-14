

import * as Pervasives from "../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as GameObjectAPI$Wonderjs from "../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as OptionService$Wonderjs from "../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/OptionService.js";
import * as BaseEventTool$WonderEditor from "./ui/BaseEventTool.js";
import * as SceneTreeNodeDomTool$WonderEditor from "./domIndex/SceneTreeNodeDomTool.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../src/service/state/engine/BasicCameraViewEngineService.js";

function getCurrentCameraGameObject(engineState) {
  var match = BasicCameraViewEngineService$WonderEditor.getActiveBasicCameraView(engineState);
  if (match !== undefined) {
    return BasicCameraViewEngineService$WonderEditor.getBasicCameraViewGameObject(match, engineState);
  }
  
}

function getCurrentCameraProjection(engineState) {
  return GameObjectAPI$Wonderjs.unsafeGetGameObjectPerspectiveCameraProjectionComponent(OptionService$Wonderjs.unsafeGet(getCurrentCameraGameObject(engineState)), engineState);
}

function _getComponentInputByIndex(componentDomIndex, index, domChildren) {
  var articleParent = domChildren[0];
  var article = articleParent.children[componentDomIndex];
  var component = article.children[1];
  var floatInputBase = component.children[index];
  var floatArticle = floatInputBase.children[0];
  return floatArticle.children[1];
}

function triggerChangeArcballDistance(value, domChildren) {
  var arcballDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getArcballCameraComponentFromCamera */9](/* () */0);
  var input = _getComponentInputByIndex(arcballDomIndex, 0, domChildren);
  return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(Pervasives.string_of_float(value)));
}

function triggerBlurArcballDistance(value, domChildren) {
  var arcballDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getArcballCameraComponentFromCamera */9](/* () */0);
  var input = _getComponentInputByIndex(arcballDomIndex, 0, domChildren);
  return BaseEventTool$WonderEditor.triggerBlurEvent(input, BaseEventTool$WonderEditor.buildFormEvent(Pervasives.string_of_float(value)));
}

function triggerChangeArcballMinDistance(value, domChildren) {
  var arcballDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getArcballCameraComponentFromCamera */9](/* () */0);
  var input = _getComponentInputByIndex(arcballDomIndex, 1, domChildren);
  return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(Pervasives.string_of_float(value)));
}

function triggerBlurArcballMinDistance(value, domChildren) {
  var arcballDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getArcballCameraComponentFromCamera */9](/* () */0);
  var input = _getComponentInputByIndex(arcballDomIndex, 1, domChildren);
  return BaseEventTool$WonderEditor.triggerBlurEvent(input, BaseEventTool$WonderEditor.buildFormEvent(Pervasives.string_of_float(value)));
}

export {
  getCurrentCameraGameObject ,
  getCurrentCameraProjection ,
  _getComponentInputByIndex ,
  triggerChangeArcballDistance ,
  triggerBlurArcballDistance ,
  triggerChangeArcballMinDistance ,
  triggerBlurArcballMinDistance ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
