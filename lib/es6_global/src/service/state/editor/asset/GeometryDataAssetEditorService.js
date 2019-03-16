

import * as GeometryDataAssetService$WonderEditor from "../../../record/editor/asset/GeometryDataAssetService.js";

function getGeometryData(editorState) {
  return GeometryDataAssetService$WonderEditor.getGeometryData(editorState[/* assetRecord */2]);
}

function setGeometryData(geometryData, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */GeometryDataAssetService$WonderEditor.setGeometryData(geometryData, editorState[/* assetRecord */2]),
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13],
          /* languageType */editorState[/* languageType */14]
        ];
}

function unsafeGetDefaultCubeGeometryComponent(editorState) {
  return GeometryDataAssetService$WonderEditor.getGeometryData(editorState[/* assetRecord */2])[/* defaultCubeGeometryComponent */0];
}

function unsafeGetDefaultSphereGeometryComponent(editorState) {
  return GeometryDataAssetService$WonderEditor.getGeometryData(editorState[/* assetRecord */2])[/* defaultSphereGeometryComponent */1];
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
