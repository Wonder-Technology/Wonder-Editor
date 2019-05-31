

import * as OptionService$WonderEditor from "../../../../primitive/OptionService.js";

function getViewRect(editorState) {
  return editorState[/* gameViewRecord */7][/* viewRect */0];
}

function unsafeGetViewRect(editorState) {
  return OptionService$WonderEditor.unsafeGet(editorState[/* gameViewRecord */7][/* viewRect */0]);
}

function updateViewRect(param, editorState) {
  var init = editorState[/* gameViewRecord */7];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord : record */[
            /* viewRect *//* tuple */[
              param[0],
              param[1],
              param[2],
              param[3]
            ],
            /* activedBasicCameraView */init[/* activedBasicCameraView */1]
          ],
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

function getActivedBasicCameraView(editorState) {
  return editorState[/* gameViewRecord */7][/* activedBasicCameraView */1];
}

function setActivedBasicCameraView(basicCameraView, editorState) {
  var init = editorState[/* gameViewRecord */7];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord : record */[
            /* viewRect */init[/* viewRect */0],
            /* activedBasicCameraView */basicCameraView
          ],
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

function removeActivedBasicCameraView(editorState) {
  var init = editorState[/* gameViewRecord */7];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord : record */[
            /* viewRect */init[/* viewRect */0],
            /* activedBasicCameraView */undefined
          ],
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

function isActiveBasicCameraView(targetActiveBasicCameraView, editorState) {
  var match = editorState[/* gameViewRecord */7][/* activedBasicCameraView */1];
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
