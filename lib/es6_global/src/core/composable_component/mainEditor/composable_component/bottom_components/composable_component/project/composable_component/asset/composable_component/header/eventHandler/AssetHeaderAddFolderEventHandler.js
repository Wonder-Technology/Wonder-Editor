

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as IdAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/IdAssetEditorService.js";
import * as FolderNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/FolderNodeAssetService.js";
import * as FolderNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/FolderNodeAssetEditorService.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, _, _$1) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
          var match = IdAssetEditorService$WonderEditor.generateNodeId(editorState);
          var editorState$1 = match[0];
          var parentFolderNode = OperateTreeAssetEditorService$WonderEditor.unsafeGetSelectedFolderNodeInAssetTree(editorState$1);
          return FolderNodeAssetEditorService$WonderEditor.addFolderNodeToAssetTree(parentFolderNode, FolderNodeAssetService$WonderEditor.buildNode(match[1], OperateTreeAssetLogicService$WonderEditor.getUniqueNodeName(FolderNodeAssetService$WonderEditor.getNewFolderName(/* () */0), parentFolderNode, engineState), undefined, /* () */0), editorState$1);
        }));
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Project */4]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* handleSelfLogic */handleSelfLogic
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      handleSelfLogic,
      setUndoValueToCopiedEngineState
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
