

import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as GeometryService$WonderEditor from "../../../../../../../../../../../service/primitive/geometry/GeometryService.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateAssetService$WonderEditor from "../../../../../../../../../../../service/state/asset/StateAssetService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/SceneEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as GeometryEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/GeometryEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/GameObjectEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";
import * as TextureNodeMapAssetService$WonderEditor from "../../../../../../../../../../../service/state/asset/TextureNodeMapAssetService.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onClick = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndoByStackFirst = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

function _handleSetMap(gameObject, materialComponent, mapId, engineStateToGetData) {
  var match = BasicMaterialEngineService$WonderEditor.getMap(materialComponent, engineStateToGetData);
  if (match) {
    Log$WonderLog.print("has material");
    return OperateTextureLogicService$WonderEditor.changeTextureMapAndRereshEngineState(materialComponent, mapId);
  } else {
    Log$WonderLog.print("remove material and create material");
    return OperateTextureLogicService$WonderEditor.replaceMaterialComponentToHasMapOne(gameObject, materialComponent, mapId);
  }
}

function _handleBoxGeometryAddMap(gameObject, materialComponent, mapId, engineStateToGetData) {
  var match = GeometryService$WonderEditor.hasTexCoords(GeometryEngineService$WonderEditor.getBoxGeometryTexCoords(engineStateToGetData));
  if (match) {
    return _handleSetMap(gameObject, materialComponent, mapId, engineStateToGetData);
  } else {
    return Log$WonderLog.warn("the gameObject:" + (String(gameObject) + " have no texCoords"));
  }
}

function onMarkRedoUndoByStackLastReturnStore(param, materialComponent, dragedId) {
  var param$1 = SparseMapService$WonderCommonlib.unsafeGet(dragedId, TextureNodeMapAssetService$WonderEditor.getTextureNodeMap(StateAssetService$WonderEditor.getState(/* () */0)));
  var gameObject = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  var engineStateToGetData = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
  var match = GameObjectEngineService$WonderEditor.hasGameObjectBoxGeometryComponent(gameObject, engineStateToGetData);
  if (match) {
    _handleBoxGeometryAddMap(gameObject, materialComponent, param$1[/* textureIndex */0], engineStateToGetData);
  }
  Curry._1(param[1], AppStore$WonderEditor.ReLoad);
  return param[0];
}

var DragEventHandler = /* module */[
  /* onSelect */onSelect,
  /* onClick */onClick,
  /* onDrop */onDrop,
  /* onMarkRedoUndoByStackFirst */onMarkRedoUndoByStackFirst,
  /* _handleSetMap */_handleSetMap,
  /* _handleBoxGeometryAddMap */_handleBoxGeometryAddMap,
  /* onMarkRedoUndoByStackLastReturnStore */onMarkRedoUndoByStackLastReturnStore
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onClick,
      onMarkRedoUndoByStackFirst,
      onMarkRedoUndoByStackLastReturnStore
    ]);

export {
  DragEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
