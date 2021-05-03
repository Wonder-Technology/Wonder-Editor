

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";
import * as ImgContextImgCanvasService$WonderEditor from "../../../record/editor/imgCanvas/ImgContextImgCanvasService.js";

function getImgContext(editorState) {
  return ImgContextImgCanvasService$WonderEditor.getImgContext(editorState[/* imgCanvasRecord */1]);
}

function unsafeGetImgContext(editorState) {
  return OptionService$WonderEditor.unsafeGet(ImgContextImgCanvasService$WonderEditor.getImgContext(editorState[/* imgCanvasRecord */1]));
}

function setImgContext(imgContext, editorState) {
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */ImgContextImgCanvasService$WonderEditor.setImgContext(imgContext, editorState[/* imgCanvasRecord */1]),
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
          /* languageType */editorState[/* languageType */17]
        ];
}

export {
  getImgContext ,
  unsafeGetImgContext ,
  setImgContext ,
  
}
/* OptionService-WonderEditor Not a pure module */
