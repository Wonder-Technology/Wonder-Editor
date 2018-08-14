

import * as Curry from "../../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as GeometryService$WonderEditor from "../../../../../../../../../../../../../service/primitive/geometry/GeometryService.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as GeometryEngineService$WonderEditor from "../../../../../../../../../../../../../service/state/engine/GeometryEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../../../../../../../../service/state/engine/LightMaterialEngineService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";
import * as AssetTextureNodeMapEditorService$WonderEditor from "../../../../../../../../../../../../../service/state/editor/asset/AssetTextureNodeMapEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../../../../service/state/engine/GameObjectComponentEngineService.js";
import * as OperateLightMaterialLogicService$WonderEditor from "../../../../../../../../../../../../../service/stateTuple/logic/OperateLightMaterialLogicService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _handleSetMap(gameObject, materialComponent, mapId, engineStateToGetData) {
  var match = LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(materialComponent, engineStateToGetData);
  if (match !== undefined) {
    return OperateTextureLogicService$WonderEditor.changeTextureMapAndRereshEngineState(materialComponent, mapId, OperateLightMaterialLogicService$WonderEditor.setLightMaterialMapToEngineState);
  } else {
    var color = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
            return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(materialComponent, param);
          }));
    return OperateTextureLogicService$WonderEditor.replaceMaterialComponentFromNoMapToHasMap(/* tuple */[
                gameObject,
                materialComponent,
                mapId
              ], color, /* tuple */[
                OperateLightMaterialLogicService$WonderEditor.disposeLightMaterial,
                OperateLightMaterialLogicService$WonderEditor.setLightMaterialColor,
                OperateLightMaterialLogicService$WonderEditor.createLightMaterial,
                OperateLightMaterialLogicService$WonderEditor.addLightMaterial
              ], OperateLightMaterialLogicService$WonderEditor.setLightMaterialMapToEngineState);
  }
}

function _handleGeometryAddMap(gameObject, geometryComponent, materialComponent, mapId, engineStateToGetData) {
  var match = GeometryService$WonderEditor.hasTexCoords(GeometryEngineService$WonderEditor.getGeometryTexCoords(geometryComponent, engineStateToGetData));
  if (match) {
    return _handleSetMap(gameObject, materialComponent, mapId, engineStateToGetData);
  } else {
    return Log$WonderLog.warn("the gameObject:" + (String(gameObject) + " have no texCoords"));
  }
}

function handleSelfLogic(param, materialComponent, dragedId) {
  var param$1 = SparseMapService$WonderCommonlib.unsafeGet(dragedId, AssetTextureNodeMapEditorService$WonderEditor.getTextureNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
  var gameObject = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  var engineStateToGetData = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
  var match = GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(gameObject, engineStateToGetData);
  if (match) {
    _handleGeometryAddMap(gameObject, GameObjectComponentEngineService$WonderEditor.getGeometryComponent(gameObject, engineStateToGetData), materialComponent, param$1[/* textureIndex */0], engineStateToGetData);
  }
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[
            /* Asset */2,
            /* Inspector */1
          ]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* _handleSetMap */_handleSetMap,
  /* _handleGeometryAddMap */_handleGeometryAddMap,
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
