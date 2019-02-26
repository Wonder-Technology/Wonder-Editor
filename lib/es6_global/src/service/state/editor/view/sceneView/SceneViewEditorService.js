

import * as Js_option from "../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as OptionService$WonderEditor from "../../../../primitive/OptionService.js";

function getViewRect(editorState) {
  return editorState[/* sceneViewRecord */3][/* viewRect */0];
}

function unsafeGetViewRect(editorState) {
  return OptionService$WonderEditor.unsafeGet(editorState[/* sceneViewRecord */3][/* viewRect */0]);
}

function hasViewRect(editorState) {
  return Js_option.isSome(editorState[/* sceneViewRecord */3][/* viewRect */0]);
}

function updateViewRect(param, editorState) {
  var init = editorState[/* sceneViewRecord */3];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
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
          /* gameViewRecord */editorState[/* gameViewRecord */4],
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

function unsafeGetGridPlane(editorState) {
  return OptionService$WonderEditor.unsafeGet(editorState[/* sceneViewRecord */3][/* gridPlane */1]);
}

function setGridPlane(gridPlane, editorState) {
  var init = editorState[/* sceneViewRecord */3];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord : record */[
            /* viewRect */init[/* viewRect */0],
            /* gridPlane */gridPlane,
            /* editCamera */init[/* editCamera */2],
            /* transformGizmoData */init[/* transformGizmoData */3]
          ],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
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

function getEditCamera(editorState) {
  return editorState[/* sceneViewRecord */3][/* editCamera */2];
}

function unsafeGetEditCamera(editorState) {
  return OptionService$WonderEditor.unsafeGet(editorState[/* sceneViewRecord */3][/* editCamera */2]);
}

function setEditCamera(editCamera, editorState) {
  var init = editorState[/* sceneViewRecord */3];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord : record */[
            /* viewRect */init[/* viewRect */0],
            /* gridPlane */init[/* gridPlane */1],
            /* editCamera */editCamera,
            /* transformGizmoData */init[/* transformGizmoData */3]
          ],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
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

function unsafeGetNeedActiveCamera(editorState) {
  return OptionService$WonderEditor.unsafeGet(editorState[/* sceneViewRecord */3][/* editCamera */2]);
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
