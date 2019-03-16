

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function unsafeGetType(editorState) {
  return OptionService$WonderEditor.unsafeGet(editorState[/* languageType */14]);
}

function setType(type_, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
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
