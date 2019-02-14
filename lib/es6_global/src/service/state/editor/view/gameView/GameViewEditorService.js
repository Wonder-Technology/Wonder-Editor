

import * as OptionService$WonderEditor from "../../../../primitive/OptionService.js";

function getViewRect(editorState) {
  return editorState[/* gameViewRecord */4][/* viewRect */0];
}

function unsafeGetViewRect(editorState) {
  return OptionService$WonderEditor.unsafeGet(editorState[/* gameViewRecord */4][/* viewRect */0]);
}

function updateViewRect(param, editorState) {
  var init = editorState[/* gameViewRecord */4];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord : record */[
            /* viewRect *//* tuple */[
              param[0],
              param[1],
              param[2],
              param[3]
            ],
            /* activedBasicCameraView */init[/* activedBasicCameraView */1]
          ],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

function getActivedBasicCameraView(editorState) {
  return editorState[/* gameViewRecord */4][/* activedBasicCameraView */1];
}

function setActivedBasicCameraView(basicCameraView, editorState) {
  var init = editorState[/* gameViewRecord */4];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord : record */[
            /* viewRect */init[/* viewRect */0],
            /* activedBasicCameraView */basicCameraView
          ],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

function removeActivedBasicCameraView(editorState) {
  var init = editorState[/* gameViewRecord */4];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord : record */[
            /* viewRect */init[/* viewRect */0],
            /* activedBasicCameraView */undefined
          ],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

function isActiveBasicCameraView(targetActiveBasicCameraView, editorState) {
  var match = editorState[/* gameViewRecord */4][/* activedBasicCameraView */1];
  if (match !== undefined) {
    return match === targetActiveBasicCameraView;
  } else {
    return false;
  }
}

export {
  getViewRect ,
  unsafeGetViewRect ,
  updateViewRect ,
  getActivedBasicCameraView ,
  setActivedBasicCameraView ,
  removeActivedBasicCameraView ,
  isActiveBasicCameraView ,
  
}
/* OptionService-WonderEditor Not a pure module */
