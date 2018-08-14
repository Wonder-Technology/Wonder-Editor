

import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as BaseEventTool$WonderEditor from "../../../../../../../tool/ui/BaseEventTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../../tool/BuildComponentTool.js";

function triggerClickCheckBox(domChildren) {
  var checkBoxDiv = domChildren[1];
  var checkBox = checkBoxDiv.children[1];
  return BaseEventTool$WonderEditor.triggerClickFromEvent(checkBox, BaseEventTool$WonderEditor.buildFormEvent(true));
}

function triggerClickSetCurrentCameraEvent() {
  var component = BuildComponentTool$WonderEditor.buildCameraView(TestTool$WonderEditor.buildEmptyAppState(/* () */0));
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, triggerClickCheckBox);
}

export {
  triggerClickCheckBox ,
  triggerClickSetCurrentCameraEvent ,
  
}
/* TestTool-WonderEditor Not a pure module */
