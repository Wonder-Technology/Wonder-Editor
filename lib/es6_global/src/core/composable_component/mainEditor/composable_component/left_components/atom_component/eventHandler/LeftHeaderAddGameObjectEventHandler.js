

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../service/state/engine/state/StateEngineService.js";
import * as PrimitiveLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/PrimitiveLogicService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as GeometryDataAssetEditorService$WonderEditor from "../../../../../../../service/state/editor/asset/GeometryDataAssetEditorService.js";
import * as MaterialDataAssetEditorService$WonderEditor from "../../../../../../../service/state/editor/asset/MaterialDataAssetEditorService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var setUndoValueToCopiedEngineStateForPromise = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

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

function _initAndAddChild(parent, child, engineState) {
  return HierarchyGameObjectEngineService$WonderEditor.addChild(parent, child, GameObjectEngineService$WonderEditor.initGameObject(child, engineState));
}

function _addToGameObject(newGameObject, targetGameObject, param) {
  var editorState = SceneTreeEditorService$WonderEditor.setIsShowChildren(targetGameObject, true, SceneTreeEditorService$WonderEditor.setIsShowChildren(newGameObject, SceneTreeEditorService$WonderEditor.getDefaultIsShowChildren(/* () */0), param[0]));
  var engineState = _initAndAddChild(targetGameObject, newGameObject, param[1]);
  return /* tuple */[
          editorState,
          engineState
        ];
}

function handleSelfLogic(param, gameObjectType, param$1) {
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
    match$2 = _addToGameObject(newGameObject, match$1, /* tuple */[
          editorState$1,
          engineState$1
        ]);
  } else {
    var editorState$2 = SceneTreeEditorService$WonderEditor.setIsShowChildren(newGameObject, SceneTreeEditorService$WonderEditor.getDefaultIsShowChildren(/* () */0), editorState$1);
    var engineState$2 = _initAndAddChild(SceneEngineService$WonderEditor.getSceneGameObject(engineState$1), newGameObject, engineState$1);
    match$2 = /* tuple */[
      editorState$2,
      engineState$2
    ];
  }
  StateLogicService$WonderEditor.refreshEngineState(match$2[1]);
  StateEditorService$WonderEditor.setState(match$2[0]);
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* SceneTree */6]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* setUndoValueToCopiedEngineStateForPromise */setUndoValueToCopiedEngineStateForPromise,
  /* _createGameObjectByType */_createGameObjectByType,
  /* _initAndAddChild */_initAndAddChild,
  /* _addToGameObject */_addToGameObject,
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
