

import * as GeometryDataAssetService$WonderEditor from "../../../record/editor/asset/GeometryDataAssetService.js";

function getGeometryData(editorState) {
  return GeometryDataAssetService$WonderEditor.getGeometryData(editorState[/* assetRecord */5]);
}

function setGeometryData(geometryData, editorState) {
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */GeometryDataAssetService$WonderEditor.setGeometryData(geometryData, editorState[/* assetRecord */5]),
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

function unsafeGetDefaultCubeGeometryComponent(editorState) {
  return GeometryDataAssetService$WonderEditor.getGeometryData(editorState[/* assetRecord */5])[/* defaultCubeGeometryComponent */0];
}

function unsafeGetDefaultSphereGeometryComponent(editorState) {
  return GeometryDataAssetService$WonderEditor.getGeometryData(editorState[/* assetRecord */5])[/* defaultSphereGeometryComponent */1];
}

function unsafeGetDefaultGeometryComponents(editorState) {
  return /* array */[
          unsafeGetDefaultCubeGeometryComponent(editorState),
          unsafeGetDefaultSphereGeometryComponent(editorState)
        ];
}

export {
  getGeometryData ,
  setGeometryData ,
  unsafeGetDefaultCubeGeometryComponent ,
  unsafeGetDefaultSphereGeometryComponent ,
  unsafeGetDefaultGeometryComponents ,
  
}
/* No side effect */
