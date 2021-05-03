

import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as DefaultSceneInspectorEngineUtils$WonderEditor from "../../utils/inspectorEngine/DefaultSceneInspectorEngineUtils.js";
import * as ContainerGameObjectInspectorCanvasEditorService$WonderEditor from "../../../service/state/editor/inspectorCanvas/ContainerGameObjectInspectorCanvasEditorService.js";

function initInspectorEngineJob(param, inspectorEngineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = DefaultSceneInspectorEngineUtils$WonderEditor.createDefaultScene(inspectorEngineState);
  StateEditorService$WonderEditor.setState(ContainerGameObjectInspectorCanvasEditorService$WonderEditor.setContainerGameObject(match[0], editorState));
  return match[1];
}

export {
  initInspectorEngineJob ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
