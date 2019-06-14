

import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../engine/gameObject/HierarchyGameObjectEngineService.js";
import * as ContainerGameObjectInspectorCanvasEditorService$WonderEditor from "./ContainerGameObjectInspectorCanvasEditorService.js";

function getMaterialSphereGameObjectInInspectorCanvas(editorState) {
  return editorState[/* inspectorCanvasRecord */0][/* materialSphereGameObjectInInspectorCanvas */2];
}

function setMaterialSphereGameObjectInInspectorCanvas(materialSphereGameObjectInInspectorCanvas, editorState) {
  var init = editorState[/* inspectorCanvasRecord */0];
  return /* record */[
          /* inspectorCanvasRecord : record */[
            /* containerGameObject */init[/* containerGameObject */0],
            /* basicSourceTextureCacheMap */init[/* basicSourceTextureCacheMap */1],
            /* materialSphereGameObjectInInspectorCanvas */materialSphereGameObjectInInspectorCanvas
          ],
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

function removeMaterialSphereGameObjectInInspectorCanvas(editorState) {
  var init = editorState[/* inspectorCanvasRecord */0];
  return /* record */[
          /* inspectorCanvasRecord : record */[
            /* containerGameObject */init[/* containerGameObject */0],
            /* basicSourceTextureCacheMap */init[/* basicSourceTextureCacheMap */1],
            /* materialSphereGameObjectInInspectorCanvas */undefined
          ],
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

function isExistInContainer(editorState, inspectorEngineState) {
  var match = editorState[/* inspectorCanvasRecord */0][/* materialSphereGameObjectInInspectorCanvas */2];
  if (match !== undefined) {
    return Js_option.isSome(HierarchyGameObjectEngineService$WonderEditor.findGameObjectByUid(match, ContainerGameObjectInspectorCanvasEditorService$WonderEditor.unsafeGetContainerGameObject(editorState), inspectorEngineState));
  } else {
    return false;
  }
}

export {
  getMaterialSphereGameObjectInInspectorCanvas ,
  setMaterialSphereGameObjectInInspectorCanvas ,
  removeMaterialSphereGameObjectInInspectorCanvas ,
  isExistInContainer ,
  
}
/* HierarchyGameObjectEngineService-WonderEditor Not a pure module */
