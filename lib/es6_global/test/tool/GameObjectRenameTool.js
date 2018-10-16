

import * as ArrayService$WonderEditor from "../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "./ui/BaseEventTool.js";

function _getFromArray(array, index) {
  return ArrayService$WonderEditor.unsafeGetNth(index, array);
}

function _getTriggerRenameInput(domChildren) {
  var article = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
  var array = article.children;
  var div = ArrayService$WonderEditor.unsafeGetNth(0, array);
  var array$1 = div.children;
  var inputArticle = ArrayService$WonderEditor.unsafeGetNth(0, array$1);
  var array$2 = inputArticle.children;
  return ArrayService$WonderEditor.unsafeGetNth(1, array$2);
}

function triggerRenameChangeEvent(value, domChildren) {
  var input = _getTriggerRenameInput(domChildren);
  return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerRenameBlurEvent(value, domChildren) {
  var input = _getTriggerRenameInput(domChildren);
  return BaseEventTool$WonderEditor.triggerBlurEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

export {
  _getFromArray ,
  _getTriggerRenameInput ,
  triggerRenameChangeEvent ,
  triggerRenameBlurEvent ,
  
}
/* ArrayService-WonderEditor Not a pure module */
