

import * as Pervasives from "../../../../../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as ArrayService$WonderEditor from "../../../../../../../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "../../../../../../../tool/ui/BaseEventTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../../tool/BuildComponentTool.js";

function _getFromArray(array, index) {
  return ArrayService$WonderEditor.unsafeGetNth(index, array);
}

function getNearDomIndex() {
  return 1;
}

function getFarDomIndex() {
  return 2;
}

function getFovyDomIndex() {
  return 3;
}

function _getComponentInputByIndex(index, domChildren) {
  var div = ArrayService$WonderEditor.unsafeGetNth(index, domChildren);
  var array = div.children;
  var article = ArrayService$WonderEditor.unsafeGetNth(0, array);
  return article.children[1];
}

function triggerPerspectiveComponentChangeEvent(index, value, domChildren) {
  var input = _getComponentInputByIndex(index, domChildren);
  return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(Pervasives.string_of_float(value)));
}

function triggerPerspectiveComponentBlurEvent(index, value, domChildren) {
  var input = _getComponentInputByIndex(index, domChildren);
  return BaseEventTool$WonderEditor.triggerBlurEvent(input, BaseEventTool$WonderEditor.buildFormEvent(Pervasives.string_of_float(value)));
}

function triggerPerspectiveCameraChangeAndBlurEvent(domIndex, value) {
  var component = BuildComponentTool$WonderEditor.buildCameraProjection(/* () */0);
  BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
          return triggerPerspectiveComponentChangeEvent(domIndex, value, param);
        }));
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                return triggerPerspectiveComponentBlurEvent(domIndex, value, param);
              }));
}

export {
  _getFromArray ,
  getNearDomIndex ,
  getFarDomIndex ,
  getFovyDomIndex ,
  _getComponentInputByIndex ,
  triggerPerspectiveComponentChangeEvent ,
  triggerPerspectiveComponentBlurEvent ,
  triggerPerspectiveCameraChangeAndBlurEvent ,
  
}
/* ArrayService-WonderEditor Not a pure module */
