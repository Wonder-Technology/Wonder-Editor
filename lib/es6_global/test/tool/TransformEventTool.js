

import * as TestTool$WonderEditor from "./TestTool.js";
import * as BaseEventTool$WonderEditor from "./ui/BaseEventTool.js";
import * as GameObjectTool$WonderEditor from "./GameObjectTool.js";
import * as BuildComponentTool$WonderEditor from "./BuildComponentTool.js";

function _getPositionInputByIndex(index, domChildren) {
  var itemDiv = domChildren[0];
  var templateArticle = itemDiv.children[1];
  var floatArticle = templateArticle.children[index];
  return floatArticle.children[1];
}

function triggerChangePositionX(value, domChildren) {
  var input = _getPositionInputByIndex(0, domChildren);
  return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerBlurPositionX(value, domChildren) {
  var input = _getPositionInputByIndex(0, domChildren);
  return BaseEventTool$WonderEditor.triggerBlurEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerChangePositionY(value, domChildren) {
  var input = _getPositionInputByIndex(1, domChildren);
  return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerBlurPositionY(value, domChildren) {
  var input = _getPositionInputByIndex(1, domChildren);
  return BaseEventTool$WonderEditor.triggerBlurEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerChangePositionZ(value, domChildren) {
  var input = _getPositionInputByIndex(2, domChildren);
  return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function simulateTwiceChangePosition($staropt$star, $staropt$star$1, _) {
  var firstValue = $staropt$star !== undefined ? $staropt$star : "11.25";
  var secondValue = $staropt$star$1 !== undefined ? $staropt$star$1 : "15";
  var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
  var component = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
  BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
          return triggerChangePositionX(firstValue, param);
        }));
  BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
          return triggerBlurPositionX(firstValue, param);
        }));
  BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
          return triggerChangePositionY(secondValue, param);
        }));
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                return triggerBlurPositionY(secondValue, param);
              }));
}

function _getScaleInputByIndex(index, domChildren) {
  var itemDiv = domChildren[2];
  var templateArticle = itemDiv.children[1];
  var floatArticle = templateArticle.children[index];
  return floatArticle.children[1];
}

function triggerChangeScaleX(value, domChildren) {
  var input = _getScaleInputByIndex(0, domChildren);
  return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerBlurScaleX(value, domChildren) {
  var input = _getScaleInputByIndex(0, domChildren);
  return BaseEventTool$WonderEditor.triggerBlurEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerChangeScaleY(value, domChildren) {
  var input = _getScaleInputByIndex(1, domChildren);
  return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerBlurScaleY(value, domChildren) {
  var input = _getScaleInputByIndex(1, domChildren);
  return BaseEventTool$WonderEditor.triggerBlurEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerChangeScaleZ(value, domChildren) {
  var input = _getScaleInputByIndex(2, domChildren);
  return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function _getRotationInputByIndex(index, domChildren) {
  var itemDiv = domChildren[1];
  var templateArticle = itemDiv.children[1];
  var floatArticle = templateArticle.children[index];
  return floatArticle.children[1];
}

function triggerChangeRotationX(value, domChildren) {
  var input = _getRotationInputByIndex(0, domChildren);
  return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerBlurRotationX(value, domChildren) {
  var input = _getRotationInputByIndex(0, domChildren);
  return BaseEventTool$WonderEditor.triggerBlurEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerChangeRotationY(value, domChildren) {
  var input = _getRotationInputByIndex(1, domChildren);
  return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerBlurRotationY(value, domChildren) {
  var input = _getRotationInputByIndex(1, domChildren);
  return BaseEventTool$WonderEditor.triggerBlurEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerChangeRotationZ(value, domChildren) {
  var input = _getRotationInputByIndex(2, domChildren);
  return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

export {
  _getPositionInputByIndex ,
  triggerChangePositionX ,
  triggerBlurPositionX ,
  triggerChangePositionY ,
  triggerBlurPositionY ,
  triggerChangePositionZ ,
  simulateTwiceChangePosition ,
  _getScaleInputByIndex ,
  triggerChangeScaleX ,
  triggerBlurScaleX ,
  triggerChangeScaleY ,
  triggerBlurScaleY ,
  triggerChangeScaleZ ,
  _getRotationInputByIndex ,
  triggerChangeRotationX ,
  triggerBlurRotationX ,
  triggerChangeRotationY ,
  triggerBlurRotationY ,
  triggerChangeRotationZ ,
  
}
/* TestTool-WonderEditor Not a pure module */
