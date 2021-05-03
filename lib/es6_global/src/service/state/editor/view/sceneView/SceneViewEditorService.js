

import * as Js_option from "../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as OptionService$WonderEditor from "../../../../primitive/OptionService.js";

function getViewRect(editorState) {
  return editorState[/* sceneViewRecord */6][/* viewRect */0];
}

function unsafeGetViewRect(editorState) {
  return OptionService$WonderEditor.unsafeGet(editorState[/* sceneViewRecord */6][/* viewRect */0]);
}

function hasViewRect(editorState) {
  return Js_option.isSome(editorState[/* sceneViewRecord */6][/* viewRect */0]);
}

function updateViewRect(param, editorState) {
  var init = editorState[/* sceneViewRecord */6];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord : record */[
            /* viewRect *//* tuple */[
              param[0],
              param[1],
              param[2],
              param[3]
            ],
            /* gridPlane */init[/* gridPlane */1],
            /* editCamera */init[/* editCamera */2],
            /* transformGizmoData */init[/* transformGizmoData */3]
          ],
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

function unsafeGetGridPlane(editorState) {
  return OptionService$WonderEditor.unsafeGet(editorState[/* sceneViewRecord */6][/* gridPlane */1]);
}

function setGridPlane(gridPlane, editorState) {
  var init = editorState[/* sceneViewRecord */6];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord : record */[
            /* viewRect */init[/* viewRect */0],
            /* gridPlane */gridPlane,
            /* editCamera */init[/* editCamera */2],
            /* transformGizmoData */init[/* transformGizmoData */3]
          ],
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

function getEditCamera(editorState) {
  return editorState[/* sceneViewRecord */6][/* editCamera */2];
}

function unsafeGetEditCamera(editorState) {
  return OptionService$WonderEditor.unsafeGet(editorState[/* sceneViewRecord */6][/* editCamera */2]);
}

function setEditCamera(editCamera, editorState) {
  var init = editorState[/* sceneViewRecord */6];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord : record */[
            /* viewRect */init[/* viewRect */0],
            /* gridPlane */init[/* gridPlane */1],
            /* editCamera */editCamera,
            /* transformGizmoData */init[/* transformGizmoData */3]
          ],
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

function unsafeGetNeedActiveCamera(editorState) {
  return OptionService$WonderEditor.unsafeGet(editorState[/* sceneViewRecord */6][/* editCamera */2]);
}

export {
  getViewRect ,
  unsafeGetViewRect ,
  hasViewRect ,
  updateViewRect ,
  unsafeGetGridPlane ,
  setGridPlane ,
  getEditCamera ,
  unsafeGetEditCamera ,
  setEditCamera ,
  unsafeGetNeedActiveCamera ,
  
}
/* OptionService-WonderEditor Not a pure module */
