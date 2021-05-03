

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../ui/store/AppStore.js";
import * as ImageUtils$WonderEditor from "../../../../../../../../../../header/utils/ImageUtils.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as IdAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/IdAssetEditorService.js";
import * as IndexAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/IndexAssetEditorService.js";
import * as ImageDataMapAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/ImageDataMapAssetService.js";
import * as MaterialNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/MaterialNodeAssetService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/LightMaterialEngineService.js";
import * as OperateMaterialLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/material/OperateMaterialLogicService.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/ImageDataMapAssetEditorService.js";
import * as MaterialNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/MaterialNodeAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var setUndoValueToCopiedEngineStateForPromise = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

function handleSelfLogic(param, param$1, param$2) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = StateLogicService$WonderEditor.getEditorState(IdAssetEditorService$WonderEditor.generateNodeId);
  var editorState = match[0];
  var targetTreeNode = OperateTreeAssetEditorService$WonderEditor.unsafeGetSelectedFolderNodeInAssetTree(editorState);
  var materialName = OperateTreeAssetLogicService$WonderEditor.getUniqueNodeName(OperateMaterialLogicService$WonderEditor.getNewMaterilaName(/* () */0), targetTreeNode, engineState);
  var match$1 = LightMaterialEngineService$WonderEditor.createLightMaterialAndSetName(materialName, engineState);
  var match$2 = IndexAssetEditorService$WonderEditor.generateImageDataMapIndex(editorState);
  var newImageDataIndex = match$2[1];
  var editorState$1 = ImageDataMapAssetEditorService$WonderEditor.setData(newImageDataIndex, ImageDataMapAssetService$WonderEditor.buildData(OperateMaterialLogicService$WonderEditor.getDefaultSnapshotBase64(/* () */0), undefined, materialName, ImageUtils$WonderEditor.getDefaultMimeType(/* () */0), Caml_option.some(undefined), /* () */0), MaterialNodeAssetEditorService$WonderEditor.addMaterialNodeToAssetTree(targetTreeNode, MaterialNodeAssetService$WonderEditor.buildNode(match[1], /* LightMaterial */1, match$1[0], newImageDataIndex), match$2[0]));
  StateEditorService$WonderEditor.setState(editorState$1);
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Project */4]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* setUndoValueToCopiedEngineStateForPromise */setUndoValueToCopiedEngineStateForPromise,
  /* handleSelfLogic */handleSelfLogic
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      handleSelfLogic,
      setUndoValueToCopiedEngineState,
      setUndoValueToCopiedEngineStateForPromise
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
