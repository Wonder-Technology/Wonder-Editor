

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function unsafeGetType(editorState) {
  return OptionService$WonderEditor.unsafeGet(editorState[/* languageType */17]);
}

function setType(type_, editorState) {
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
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */editorState[/* consoleRecord */11],
          /* transformRecord */editorState[/* transformRecord */12],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */type_
        ];
}

function convertToType(language) {
  switch (language) {
    case "EN" : 
        return /* EN */1;
    case "ZH" : 
        return /* ZH */0;
    default:
      return /* EN */1;
  }
}

export {
  unsafeGetType ,
  setType ,
  convertToType ,
  
}
/* OptionService-WonderEditor Not a pure module */
