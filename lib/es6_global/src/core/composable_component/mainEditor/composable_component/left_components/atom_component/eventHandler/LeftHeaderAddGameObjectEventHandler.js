

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../ui/store/AppStore.js";
import * as SceneUtils$WonderEditor from "../../../../../../utils/engine/SceneUtils.js";
import * as EventHandler$WonderEditor from "../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../service/state/engine/StateEngineService.js";
import * as PrimitiveLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/PrimitiveLogicService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as GeometryDataAssetEditorService$WonderEditor from "../../../../../../../service/state/editor/asset/GeometryDataAssetEditorService.js";
import * as MaterialDataAssetEditorService$WonderEditor from "../../../../../../../service/state/editor/asset/MaterialDataAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _createGameObjectByType(gameObjectType, param) {
  var engineState = param[1];
  var editorState = param[0];
  var defaultLightMaterialData = MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultLightMaterial(editorState);
  switch (gameObjectType) {
    case 0 : 
        var defaultCubeGeometry = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultCubeGeometryComponent(editorState);
        return PrimitiveLogicService$WonderEditor.createCube(/* tuple */[
                    defaultCubeGeometry,
                    defaultLightMaterialData
                  ], editorState, engineState);
    case 1 : 
        var defaultSphereGeometry = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultSphereGeometryComponent(editorState);
        return PrimitiveLogicService$WonderEditor.createSphere(/* tuple */[
                    defaultSphereGeometry,
                    defaultLightMaterialData
                  ], editorState, engineState);
    case 2 : 
        return PrimitiveLogicService$WonderEditor.createEmptyGameObject(editorState, engineState);
    
  }
}

function handleSelfLogic(param, gameObjectType, _) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = _createGameObjectByType(gameObjectType, /* tuple */[
        editorState,
        engineState
      ]);
  var newGameObject = match[2];
  var engineState$1 = match[1];
  var editorState$1 = match[0];
  var match$1 = SceneTreeEditorService$WonderEditor.getCurrentSceneTreeNode(editorState$1);
  var match$2;
  if (match$1 !== undefined) {
    var currentSceneTreeNode = match$1;
    var editorState$2 = SceneTreeEditorService$WonderEditor.setIsShowChildren(currentSceneTreeNode, true, SceneTreeEditorService$WonderEditor.setIsShowChildren(newGameObject, SceneTreeEditorService$WonderEditor.getDefaultIsShowChildren(/* () */0), editorState$1));
    var engineState$2 = SceneUtils$WonderEditor.initGameObjectAndAddChild(currentSceneTreeNode, newGameObject, engineState$1);
    match$2 = /* tuple */[
      editorState$2,
      engineState$2
    ];
  } else {
    var editorState$3 = SceneTreeEditorService$WonderEditor.setIsShowChildren(newGameObject, SceneTreeEditorService$WonderEditor.getDefaultIsShowChildren(/* () */0), editorState$1);
    var engineState$3 = SceneUtils$WonderEditor.initGameObjectAndAddChild(SceneEngineService$WonderEditor.getSceneGameObject(engineState$1), newGameObject, engineState$1);
    match$2 = /* tuple */[
      editorState$3,
      engineState$3
    ];
  }
  StateLogicService$WonderEditor.setState(/* tuple */[
        match$2[0],
        match$2[1]
      ]);
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* SceneTree */6]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* _createGameObjectByType */_createGameObjectByType,
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
