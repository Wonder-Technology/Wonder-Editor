

import * as EventHandler$WonderEditor from "../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/GameObjectEngineService.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../../../../../utils/InspectorRenderGroupUtils.js";
import * as MaterialNodeIdMapAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/MaterialNodeIdMapAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(_, currentSceneTreeNode, param) {
  var match = param[2];
  var match$1 = param[1];
  var targetMaterial = match$1[1];
  var materialNodeId = param[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var editorState$1 = materialNodeId !== undefined ? MaterialNodeIdMapAssetEditorService$WonderEditor.setNodeId(targetMaterial, materialNodeId, editorState) : editorState;
  StateEditorService$WonderEditor.setState(editorState$1);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return StateLogicService$WonderEditor.refreshEngineState(GameObjectEngineService$WonderEditor.initGameObject(currentSceneTreeNode, InspectorRenderGroupUtils$WonderEditor.Remove[/* replaceMaterialByMaterialData */2](currentSceneTreeNode, /* tuple */[
                      /* tuple */[
                        match$1[0],
                        targetMaterial
                      ],
                      /* tuple */[
                        match[0],
                        match[1]
                      ]
                    ], engineState)));
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
