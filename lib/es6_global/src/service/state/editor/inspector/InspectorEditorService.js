

import * as ComponentTypeMapInspectorService$WonderEditor from "../../../record/editor/inspector/ComponentTypeMapInspectorService.js";

function getComponentTypeMap(editorState) {
  return ComponentTypeMapInspectorService$WonderEditor.getComponentTypeMap(editorState[/* inspectorRecord */2]);
}

function setComponentTypeMap(componentTypeMap, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */editorState[/* assetRecord */1],
          /* inspectorRecord */ComponentTypeMapInspectorService$WonderEditor.setComponentTypeMap(componentTypeMap, editorState[/* inspectorRecord */2]),
          /* currentDragSource */editorState[/* currentDragSource */3],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

function addComponentTypeToMap(index, componentType, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */editorState[/* assetRecord */1],
          /* inspectorRecord */ComponentTypeMapInspectorService$WonderEditor.addComponentTypeToMap(index, componentType, editorState[/* inspectorRecord */2]),
          /* currentDragSource */editorState[/* currentDragSource */3],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

function removeComponentTypeToMap(index, componentType, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */editorState[/* assetRecord */1],
          /* inspectorRecord */ComponentTypeMapInspectorService$WonderEditor.removeComponentTypeToMap(index, componentType, editorState[/* inspectorRecord */2]),
          /* currentDragSource */editorState[/* currentDragSource */3],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

export {
  getComponentTypeMap ,
  setComponentTypeMap ,
  addComponentTypeToMap ,
  removeComponentTypeToMap ,
  
}
/* ComponentTypeMapInspectorService-WonderEditor Not a pure module */
