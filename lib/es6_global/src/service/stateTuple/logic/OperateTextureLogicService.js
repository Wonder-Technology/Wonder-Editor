

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as FileNameService$WonderEditor from "../../atom/FileNameService.js";
import * as StateLogicService$WonderEditor from "./StateLogicService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as DirectorEngineService$WonderEditor from "../../state/engine/DirectorEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../state/engine/GameObjectEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../state/engine/BasicMaterialEngineService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../state/engine/BasicSourceTextureEngineService.js";

function getTextureBaseNameAndExtName(currentNodeId, textureNodeMap) {
  var partial_arg = SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, textureNodeMap)[/* textureIndex */0];
  return FileNameService$WonderEditor.getBaseNameAndExtName(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                    return BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(partial_arg, param);
                  })));
}

function renameTextureToEngine(texture, newName) {
  return StateLogicService$WonderEditor.getAndSetEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[texture],
                /* type_ : Texture */5
              ]], (function (param, param$1) {
                return BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName(newName, param, param$1);
              }));
}

function changeTextureMapAndRereshEngineState(material, mapId, setMapFunc) {
  var match = Curry._3(setMapFunc, mapId, material, /* tuple */[
        StateLogicService$WonderEditor.getEditEngineState(/* () */0),
        StateLogicService$WonderEditor.getRunEngineState(/* () */0)
      ]);
  StateLogicService$WonderEditor.setEditEngineState(DirectorEngineService$WonderEditor.loopBody(0, match[0]));
  return StateLogicService$WonderEditor.setRunEngineState(DirectorEngineService$WonderEditor.loopBody(0, match[1]));
}

function _replaceMaterialAndRefreshEngineState(gameObject, material, param, setMapFunc) {
  var color = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return BasicMaterialEngineService$WonderEditor.getColor(material, param);
        }));
  var match = Curry._3(param[0], gameObject, material, /* tuple */[
        StateLogicService$WonderEditor.getEditEngineState(/* () */0),
        StateLogicService$WonderEditor.getRunEngineState(/* () */0)
      ]);
  var match$1 = Curry._2(param[2], match[0], match[1]);
  var newMaterial = match$1[0];
  var engineStateTuple = Curry._3(param[1], color, newMaterial, /* tuple */[
        match$1[1],
        match$1[2]
      ]);
  var match$2 = StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[/* record */[
          /* arguments : array */[gameObject],
          /* type_ : GameObject */0
        ]], GameObjectEngineService$WonderEditor.initGameObject, Curry._3(param[3], gameObject, newMaterial, setMapFunc !== undefined ? Curry._2(setMapFunc, newMaterial, engineStateTuple) : engineStateTuple));
  StateLogicService$WonderEditor.setEditEngineState(DirectorEngineService$WonderEditor.loopBody(0, match$2[0]));
  return StateLogicService$WonderEditor.setRunEngineState(DirectorEngineService$WonderEditor.loopBody(0, match$2[1]));
}

function replaceMaterialComponentToHasMapOne(gameObject, material, mapId, param, setMapFunc) {
  return _replaceMaterialAndRefreshEngineState(gameObject, material, /* tuple */[
              param[0],
              param[1],
              param[2],
              param[3]
            ], Curry._1(setMapFunc, mapId));
}

function replaceMaterialComponentToNoMapOne(gameObject, material, param) {
  return _replaceMaterialAndRefreshEngineState(gameObject, material, /* tuple */[
              param[0],
              param[1],
              param[2],
              param[3]
            ], undefined);
}

export {
  getTextureBaseNameAndExtName ,
  renameTextureToEngine ,
  changeTextureMapAndRereshEngineState ,
  _replaceMaterialAndRefreshEngineState ,
  replaceMaterialComponentToHasMapOne ,
  replaceMaterialComponentToNoMapOne ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
