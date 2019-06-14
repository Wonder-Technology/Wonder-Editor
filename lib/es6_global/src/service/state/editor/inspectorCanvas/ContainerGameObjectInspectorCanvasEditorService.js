

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";
import * as ContainerGameObjectInspectorCanvasService$WonderEditor from "../../../record/editor/inspectorCanvas/ContainerGameObjectInspectorCanvasService.js";

function getContainerGameObject(editorState) {
  return ContainerGameObjectInspectorCanvasService$WonderEditor.getContainerGameObject(editorState[/* inspectorCanvasRecord */0]);
}

function unsafeGetContainerGameObject(editorState) {
  return OptionService$WonderEditor.unsafeGet(ContainerGameObjectInspectorCanvasService$WonderEditor.getContainerGameObject(editorState[/* inspectorCanvasRecord */0]));
}

function setContainerGameObject(containerGameObject, editorState) {
  return /* record */[
          /* inspectorCanvasRecord */ContainerGameObjectInspectorCanvasService$WonderEditor.setContainerGameObject(containerGameObject, editorState[/* inspectorCanvasRecord */0]),
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */editorState[/* consoleRecord */11],
          /* transformRecord */editorState[/* transformRecord */12],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */editorState[/* languageType */17]
        ];
}

export {
  getContainerGameObject ,
  unsafeGetContainerGameObject ,
  setContainerGameObject ,
  
}
/* OptionService-WonderEditor Not a pure module */
