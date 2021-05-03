

import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../ui/store/AppStore.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as FolderNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/FolderNodeAssetEditorService.js";

function enterFolder(dispatchFunc, nodeId) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return FolderNodeAssetEditorService$WonderEditor.enterFolder(nodeId, param);
        }));
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* All */1]]
      ]);
  return /* () */0;
}

export {
  enterFolder ,
  
}
/* AppStore-WonderEditor Not a pure module */
