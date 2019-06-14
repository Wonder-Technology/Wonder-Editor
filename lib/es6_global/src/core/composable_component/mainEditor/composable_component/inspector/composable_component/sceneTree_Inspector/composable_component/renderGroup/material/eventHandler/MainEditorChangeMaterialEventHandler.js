

import * as EventHandler$WonderEditor from "../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as OptionService$WonderEditor from "../../../../../../../../../../../service/primitive/OptionService.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../../../../../utils/InspectorRenderGroupUtils.js";
import * as MaterialNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/MaterialNodeAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var setUndoValueToCopiedEngineStateForPromise = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

function handleSelfLogic(param, currentSceneTreeNode, param$1) {
  var match = param$1[2];
  var targetMaterialType = match[1];
  var match$1 = param$1[1];
  var targetMaterial = match$1[1];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var editorState$1 = OptionService$WonderEditor.eitherWithNoData((function (materialNodeId) {
          return MaterialNodeAssetEditorService$WonderEditor.updateMaterialNodeData(materialNodeId, targetMaterial, targetMaterialType, editorState);
        }), (function (param) {
          return editorState;
        }), param$1[0]);
  StateEditorService$WonderEditor.setState(editorState$1);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return StateLogicService$WonderEditor.refreshEngineState(GameObjectEngineService$WonderEditor.initGameObject(currentSceneTreeNode, InspectorRenderGroupUtils$WonderEditor.Remove[/* replaceMaterialByMaterialData */2](currentSceneTreeNode, /* tuple */[
                      /* tuple */[
                        match$1[0],
                        targetMaterial
                      ],
                      /* tuple */[
                        match[0],
                        targetMaterialType
                      ]
                    ], engineState)));
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
