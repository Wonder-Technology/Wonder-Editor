

import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function getGameViewIMGUIFunc(editorState) {
  return editorState[/* imguiRecord */9][/* gameViewIMGUIFunc */0];
}

function unsafeGetGameViewIMGUIFunc(editorState) {
  return OptionService$WonderEditor.unsafeGet(editorState[/* imguiRecord */9][/* gameViewIMGUIFunc */0]);
}

function setGameViewIMGUIFunc(imguiFunc, editorState) {
  var init = editorState[/* imguiRecord */9];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord : record */[
            /* gameViewIMGUIFunc */Caml_option.some(imguiFunc),
            /* gameViewCustomData */init[/* gameViewCustomData */1]
          ],
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

function hasGameViewIMGUIData(editorState) {
  return Js_option.isSome(editorState[/* imguiRecord */9][/* gameViewIMGUIFunc */0]);
}

function removeGameViewIMGUIFunc(editorState) {
  var init = editorState[/* imguiRecord */9];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord : record */[
            /* gameViewIMGUIFunc */undefined,
            /* gameViewCustomData */init[/* gameViewCustomData */1]
          ],
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

function getGameViewIMGUICustomData(editorState) {
  return editorState[/* imguiRecord */9][/* gameViewCustomData */1];
}

function unsafeGetGameViewIMGUICustomData(editorState) {
  return OptionService$WonderEditor.unsafeGet(editorState[/* imguiRecord */9][/* gameViewCustomData */1]);
}

function setGameViewIMGUICustomData(customData, editorState) {
  var init = editorState[/* imguiRecord */9];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord : record */[
            /* gameViewIMGUIFunc */init[/* gameViewIMGUIFunc */0],
            /* gameViewCustomData */Caml_option.some(customData)
          ],
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

function removeGameViewIMGUICustomData(editorState) {
  var init = editorState[/* imguiRecord */9];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord : record */[
            /* gameViewIMGUIFunc */init[/* gameViewIMGUIFunc */0],
            /* gameViewCustomData */undefined
          ],
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
