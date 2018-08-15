

import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as ArrayService$WonderEditor from "../../../../../../../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "../../../../../../../tool/ui/BaseEventTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../../tool/BuildComponentTool.js";

function _getFromArray(array, index) {
  return ArrayService$WonderEditor.getNth(index, array);
}

function getDrawModeLineType() {
  return /* Lines */1;
}

function getDrawModePointType() {
  return /* Points */0;
}

function getDrawModeTriangleFanType() {
  return /* Triangle_fan */6;
}

function triggerChangeWrapEvent(value, domChildren) {
  var div = ArrayService$WonderEditor.getNth(0, domChildren);
  var array = div.children;
  var article = ArrayService$WonderEditor.getNth(0, array);
  var array$1 = article.children;
  var select = ArrayService$WonderEditor.getNth(1, array$1);
  return BaseEventTool$WonderEditor.triggerChangeEvent(select, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerChangeDrawModeEvent(type_) {
  var inspectorComponent = BuildComponentTool$WonderEditor.buildMeshRenderer(TestTool$WonderEditor.buildEmptyAppState(/* () */0));
  var partial_arg = String(type_);
  return BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                return triggerChangeWrapEvent(partial_arg, param);
              }));
}

export {
  _getFromArray ,
  getDrawModeLineType ,
  getDrawModePointType ,
  getDrawModeTriangleFanType ,
  triggerChangeWrapEvent ,
  triggerChangeDrawModeEvent ,
  
}
/* TestTool-WonderEditor Not a pure module */
