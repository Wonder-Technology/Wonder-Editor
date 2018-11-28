

import * as Pervasives from "../../../../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as ArrayService$WonderEditor from "../../../../../../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "../../../../../../tool/ui/BaseEventTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../tool/BuildComponentTool.js";

function getIntensityDomIndex() {
  return 1;
}

function getConstantDomIndex() {
  return 2;
}

function getLinearDomIndex() {
  return 3;
}

function getQuadraticDomIndex() {
  return 4;
}

function getRangeDomIndex() {
  return 5;
}

function _getFromArray(array, index) {
  return ArrayService$WonderEditor.unsafeGetNth(index, array);
}

function trigerChangeLightTypeEvent(value, domChildren) {
  var selectDiv = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
  var array = selectDiv.children;
  var selectArticle = ArrayService$WonderEditor.unsafeGetNth(0, array);
  var array$1 = selectArticle.children;
  var select = ArrayService$WonderEditor.unsafeGetNth(1, array$1);
  return BaseEventTool$WonderEditor.triggerChangeEvent(select, BaseEventTool$WonderEditor.buildFormEvent(String(value)));
}

function setLightTypeToBeDirectionLight() {
  var component = BuildComponentTool$WonderEditor.buildLight(/* () */0);
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                return trigerChangeLightTypeEvent(/* DirectionLight */0, param);
              }));
}

function setLightTypeToBePointLight() {
  var component = BuildComponentTool$WonderEditor.buildLight(/* () */0);
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                return trigerChangeLightTypeEvent(/* PointLight */1, param);
              }));
}

function _getComponentInputByIndex(index, domChildren) {
  var div = ArrayService$WonderEditor.unsafeGetNth(index, domChildren);
  var array = div.children;
  var article = ArrayService$WonderEditor.unsafeGetNth(0, array);
  var array$1 = article.children;
  var inputArticle = ArrayService$WonderEditor.unsafeGetNth(0, array$1);
  return inputArticle.children[1];
}

function triggerLightComponentChangeEvent(index, value, domChildren) {
  var input = _getComponentInputByIndex(index, domChildren);
  return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(Pervasives.string_of_float(value)));
}

function triggerLightComponentBlurEvent(index, value, domChildren) {
  var input = _getComponentInputByIndex(index, domChildren);
  return BaseEventTool$WonderEditor.triggerBlurEvent(input, BaseEventTool$WonderEditor.buildFormEvent(Pervasives.string_of_float(value)));
}

export {
  getIntensityDomIndex ,
  getConstantDomIndex ,
  getLinearDomIndex ,
  getQuadraticDomIndex ,
  getRangeDomIndex ,
  _getFromArray ,
  trigerChangeLightTypeEvent ,
  setLightTypeToBeDirectionLight ,
  setLightTypeToBePointLight ,
  _getComponentInputByIndex ,
  triggerLightComponentChangeEvent ,
  triggerLightComponentBlurEvent ,
  
}
/* ArrayService-WonderEditor Not a pure module */
