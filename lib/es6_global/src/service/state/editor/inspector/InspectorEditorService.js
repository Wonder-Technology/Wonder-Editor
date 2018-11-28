

import * as ComponentTypeMapInspectorService$WonderEditor from "../../../record/editor/inspector/ComponentTypeMapInspectorService.js";

function getComponentTypeMap(editorState) {
  return ComponentTypeMapInspectorService$WonderEditor.getComponentTypeMap(editorState[/* inspectorRecord */6]);
}

function setComponentTypeMap(componentTypeMap, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */editorState[/* assetRecord */1],
          /* sceneViewRecord */editorState[/* sceneViewRecord */2],
          /* gameViewRecord */editorState[/* gameViewRecord */3],
          /* eventRecord */editorState[/* eventRecord */4],
          /* imguiRecord */editorState[/* imguiRecord */5],
          /* inspectorRecord */ComponentTypeMapInspectorService$WonderEditor.setComponentTypeMap(componentTypeMap, editorState[/* inspectorRecord */6]),
          /* currentDragSource */editorState[/* currentDragSource */7],
          /* currentSelectSource */editorState[/* currentSelectSource */8],
          /* loopId */editorState[/* loopId */9]
        ];
}

function clearComponentTypeMap(editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */editorState[/* assetRecord */1],
          /* sceneViewRecord */editorState[/* sceneViewRecord */2],
          /* gameViewRecord */editorState[/* gameViewRecord */3],
          /* eventRecord */editorState[/* eventRecord */4],
          /* imguiRecord */editorState[/* imguiRecord */5],
          /* inspectorRecord */ComponentTypeMapInspectorService$WonderEditor.clearComponentTypeMap(editorState[/* inspectorRecord */6]),
          /* currentDragSource */editorState[/* currentDragSource */7],
          /* currentSelectSource */editorState[/* currentSelectSource */8],
          /* loopId */editorState[/* loopId */9]
        ];
}

function addComponentTypeToMap(index, componentType, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */editorState[/* assetRecord */1],
          /* sceneViewRecord */editorState[/* sceneViewRecord */2],
          /* gameViewRecord */editorState[/* gameViewRecord */3],
          /* eventRecord */editorState[/* eventRecord */4],
          /* imguiRecord */editorState[/* imguiRecord */5],
          /* inspectorRecord */ComponentTypeMapInspectorService$WonderEditor.addComponentTypeToMap(index, componentType, editorState[/* inspectorRecord */6]),
          /* currentDragSource */editorState[/* currentDragSource */7],
          /* currentSelectSource */editorState[/* currentSelectSource */8],
          /* loopId */editorState[/* loopId */9]
        ];
}

function removeComponentTypeToMap(index, componentType, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */editorState[/* assetRecord */1],
          /* sceneViewRecord */editorState[/* sceneViewRecord */2],
          /* gameViewRecord */editorState[/* gameViewRecord */3],
          /* eventRecord */editorState[/* eventRecord */4],
          /* imguiRecord */editorState[/* imguiRecord */5],
          /* inspectorRecord */ComponentTypeMapInspectorService$WonderEditor.removeComponentTypeToMap(index, componentType, editorState[/* inspectorRecord */6]),
          /* currentDragSource */editorState[/* currentDragSource */7],
          /* currentSelectSource */editorState[/* currentSelectSource */8],
          /* loopId */editorState[/* loopId */9]
        ];
}

export {
  getComponentTypeMap ,
  setComponentTypeMap ,
  clearComponentTypeMap ,
  addComponentTypeToMap ,
  removeComponentTypeToMap ,
  
}
/* ComponentTypeMapInspectorService-WonderEditor Not a pure module */
