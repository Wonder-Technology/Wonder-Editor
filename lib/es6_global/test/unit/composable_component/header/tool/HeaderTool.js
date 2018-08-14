

import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as BaseEventTool$WonderEditor from "../../../../tool/ui/BaseEventTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as OperateGameObjectEventTool$WonderEditor from "../../../../tool/OperateGameObjectEventTool.js";

function triggerAddBox() {
  var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateGameObjectEventTool$WonderEditor.triggerClickAddBox);
}

function triggerDisposeBox() {
  var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateGameObjectEventTool$WonderEditor.triggerClickDisposeAndExecDisposeJob);
}

function triggerAddEmptyGameObject() {
  var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateGameObjectEventTool$WonderEditor.triggerClickAddEmptyGameObject);
}

export {
  triggerAddBox ,
  triggerDisposeBox ,
  triggerAddEmptyGameObject ,
  
}
/* TestTool-WonderEditor Not a pure module */
