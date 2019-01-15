

import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function getGameViewIMGUIFunc(editorState) {
  return editorState[/* imguiRecord */6][/* gameViewIMGUIFunc */0];
}

function unsafeGetGameViewIMGUIFunc(editorState) {
  return OptionService$WonderEditor.unsafeGet(editorState[/* imguiRecord */6][/* gameViewIMGUIFunc */0]);
}

function setGameViewIMGUIFunc(imguiFunc, editorState) {
  var init = editorState[/* imguiRecord */6];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord : record */[
            /* gameViewIMGUIFunc */Js_primitive.some(imguiFunc),
            /* gameViewCustomData */init[/* gameViewCustomData */1]
          ],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

function hasGameViewIMGUIData(editorState) {
  return Js_option.isSome(editorState[/* imguiRecord */6][/* gameViewIMGUIFunc */0]);
}

function removeGameViewIMGUIFunc(editorState) {
  var init = editorState[/* imguiRecord */6];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord : record */[
            /* gameViewIMGUIFunc */undefined,
            /* gameViewCustomData */init[/* gameViewCustomData */1]
          ],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

function getGameViewIMGUICustomData(editorState) {
  return editorState[/* imguiRecord */6][/* gameViewCustomData */1];
}

function unsafeGetGameViewIMGUICustomData(editorState) {
  return OptionService$WonderEditor.unsafeGet(editorState[/* imguiRecord */6][/* gameViewCustomData */1]);
}

function setGameViewIMGUICustomData(customData, editorState) {
  var init = editorState[/* imguiRecord */6];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord : record */[
            /* gameViewIMGUIFunc */init[/* gameViewIMGUIFunc */0],
            /* gameViewCustomData */Js_primitive.some(customData)
          ],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

function removeGameViewIMGUICustomData(editorState) {
  var init = editorState[/* imguiRecord */6];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord : record */[
            /* gameViewIMGUIFunc */init[/* gameViewIMGUIFunc */0],
            /* gameViewCustomData */undefined
          ],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

export {
  getGameViewIMGUIFunc ,
  unsafeGetGameViewIMGUIFunc ,
  setGameViewIMGUIFunc ,
  hasGameViewIMGUIData ,
  removeGameViewIMGUIFunc ,
  getGameViewIMGUICustomData ,
  unsafeGetGameViewIMGUICustomData ,
  setGameViewIMGUICustomData ,
  removeGameViewIMGUICustomData ,
  
}
/* OptionService-WonderEditor Not a pure module */
