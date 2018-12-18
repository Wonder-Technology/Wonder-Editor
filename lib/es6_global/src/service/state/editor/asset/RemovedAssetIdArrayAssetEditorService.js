

import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as RemovedAssetIdArrayAssetService$WonderEditor from "../../../record/editor/asset/RemovedAssetIdArrayAssetService.js";

function getRemovedAssetIdArray(editorState) {
  return RemovedAssetIdArrayAssetService$WonderEditor.getRemovedAssetIdArray(editorState[/* assetRecord */2]);
}

function hasUsableAssetId(editorState) {
  return RemovedAssetIdArrayAssetService$WonderEditor.hasUsableAssetId(editorState[/* assetRecord */2]);
}

function setRemovedAssetIdArray(removedAssetIdArray, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord */RemovedAssetIdArrayAssetService$WonderEditor.setRemovedAssetIdArray(removedAssetIdArray.sort((function (pre, next) {
                      return pre - next | 0;
                    })), editorState[/* assetRecord */2]),
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* currentDragSource */editorState[/* currentDragSource */10],
          /* currentSelectSource */editorState[/* currentSelectSource */11],
          /* loopId */editorState[/* loopId */12]
        ];
}

function getFirstIdIfHasUsableAssetId(editorState) {
  var match = RemovedAssetIdArrayAssetService$WonderEditor.hasUsableAssetId(editorState[/* assetRecord */2]);
  if (match) {
    var removedAssetIdArr = RemovedAssetIdArrayAssetService$WonderEditor.getRemovedAssetIdArray(editorState[/* assetRecord */2]);
    var id = Js_option.getExn(Caml_option.undefined_to_opt(removedAssetIdArr.shift()));
    return /* tuple */[
            id,
            setRemovedAssetIdArray(removedAssetIdArr, editorState)
          ];
  } else {
    return /* tuple */[
            undefined,
            editorState
          ];
  }
}

export {
  getRemovedAssetIdArray ,
  hasUsableAssetId ,
  setRemovedAssetIdArray ,
  getFirstIdIfHasUsableAssetId ,
  
}
/* RemovedAssetIdArrayAssetService-WonderEditor Not a pure module */
