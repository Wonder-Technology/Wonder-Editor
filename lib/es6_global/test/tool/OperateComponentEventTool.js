

import * as TestTool$WonderEditor from "./TestTool.js";
import * as ArrayService$WonderEditor from "../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "./ui/BaseEventTool.js";
import * as InspectorTool$WonderEditor from "./ui/InspectorTool.js";
import * as BuildComponentTool$WonderEditor from "./BuildComponentTool.js";

function _getFromArray(array, index) {
  return ArrayService$WonderEditor.getNth(index, array);
}

function _getAddComponentButtonByIndex(index, domChildren) {
  var articleParent = domChildren[0];
  var article = articleParent.children[index];
  var div = article.children[0];
  return div.children[0];
}

function triggerClickShowComponentList(componentCount, domChildren) {
  return BaseEventTool$WonderEditor.triggerClickEvent(_getAddComponentButtonByIndex(componentCount, domChildren));
}

function _getComponentCategoryByLayerIndex(index, firstLayer, domChildren) {
  var articleParent = domChildren[0];
  var article = articleParent.children[index];
  var addableComponent = article.children[0];
  var componentList = addableComponent.children[1];
  return componentList.children[firstLayer];
}

function _getComponentByLayerIndex(index, firstLayer, secondLayer, domChildren) {
  var addableComponentBoxByIndex = _getComponentCategoryByLayerIndex(index, firstLayer, domChildren);
  var categoryContent = addableComponentBoxByIndex.children[1];
  return categoryContent.children[secondLayer];
}

function triggerClickShowCategory(componentCount, categoryIndex, domChildren) {
  var addableComponentBoxByIndex = _getComponentCategoryByLayerIndex(componentCount, categoryIndex, domChildren);
  return BaseEventTool$WonderEditor.triggerClickEvent(addableComponentBoxByIndex.children[0]);
}

function triggerClickAddComponent(componentCount, categoryIndex, typeIndex, domChildren) {
  return BaseEventTool$WonderEditor.triggerClickEvent(_getComponentByLayerIndex(componentCount, categoryIndex, typeIndex, domChildren));
}

function _getColorPickDivDom(domChildren) {
  var articleParent = domChildren[4];
  var div = articleParent.children[0];
  var colorPickArticle = div.children[0];
  return colorPickArticle.children[0];
}

function triggerShowColorPickEvent(domChildren) {
  var colorPickDiv = _getColorPickDivDom(domChildren);
  return BaseEventTool$WonderEditor.triggerClickEvent(colorPickDiv.children[2]);
}

function triggerCloseColorPickEvent(domChildren) {
  var colorPickDiv = _getColorPickDivDom(domChildren);
  var div = colorPickDiv.children[3];
  return BaseEventTool$WonderEditor.triggerClickEvent(div.children[1]);
}

function addComponentIntoCurrentGameObject(componentCount, categoryIndex, componentIndex) {
  var component = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
  BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
          return BaseEventTool$WonderEditor.triggerClickEvent(_getAddComponentButtonByIndex(componentCount, param));
        }));
  BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
          return triggerClickShowCategory(componentCount, categoryIndex, param);
        }));
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                return triggerClickAddComponent(componentCount, categoryIndex, componentIndex, param);
              }));
}

function triggerRemoveComponent(index, domChildren) {
  var inspector = domChildren[0];
  var componentBox = inspector.children[index];
  var div = componentBox.children[0];
  return BaseEventTool$WonderEditor.triggerClickEvent(div.children[2]);
}

function removeComponentFromCurrentGameObject(index) {
  var component = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                return triggerRemoveComponent(index, param);
              }));
}

export {
  _getFromArray ,
  _getAddComponentButtonByIndex ,
  triggerClickShowComponentList ,
  _getComponentCategoryByLayerIndex ,
  _getComponentByLayerIndex ,
  triggerClickShowCategory ,
  triggerClickAddComponent ,
  _getColorPickDivDom ,
  triggerShowColorPickEvent ,
  triggerCloseColorPickEvent ,
  addComponentIntoCurrentGameObject ,
  triggerRemoveComponent ,
  removeComponentFromCurrentGameObject ,
  
}
/* TestTool-WonderEditor Not a pure module */
