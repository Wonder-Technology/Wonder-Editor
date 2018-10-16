

import * as ArrayService$WonderEditor from "../../../../../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "../../../../../tool/ui/BaseEventTool.js";

function _getFromArray(array, index) {
  return ArrayService$WonderEditor.unsafeGetNth(index, array);
}

function triggerRenameChangeEvent(value, domChildren) {
  var article = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
  var array = article.children;
  var div = ArrayService$WonderEditor.unsafeGetNth(0, array);
  var array$1 = div.children;
  var input = ArrayService$WonderEditor.unsafeGetNth(3, array$1);
  return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerRenameBlurEvent(value, domChildren) {
  var article = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
  var array = article.children;
  var div = ArrayService$WonderEditor.unsafeGetNth(0, array);
  var array$1 = div.children;
  var input = ArrayService$WonderEditor.unsafeGetNth(3, array$1);
  return BaseEventTool$WonderEditor.triggerBlurEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

export {
  _getFromArray ,
  triggerRenameChangeEvent ,
  triggerRenameBlurEvent ,
  
}
/* ArrayService-WonderEditor Not a pure module */
