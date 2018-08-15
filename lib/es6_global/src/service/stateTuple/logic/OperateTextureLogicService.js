

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as FileNameService$WonderEditor from "../../atom/FileNameService.js";
import * as StateLogicService$WonderEditor from "./StateLogicService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as GameObjectEngineService$WonderEditor from "../../state/engine/GameObjectEngineService.js";
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
                /* type_ : Texture */10
              ]], (function (param, param$1) {
                return BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName(newName, param, param$1);
              }));
}

function changeTextureMapAndRereshEngineState(material, mapId, setMapFunc) {
  var match = Curry._3(setMapFunc, mapId, material, /* tuple */[
        StateLogicService$WonderEditor.getEditEngineState(/* () */0),
        StateLogicService$WonderEditor.getRunEngineState(/* () */0)
      ]);
  return StateLogicService$WonderEditor.refreshEditAndRunEngineState(match[0], match[1]);
}

function _replaceMaterialAndRefreshEngineState(param, color, param$1, setMapFunc) {
  var gameObject = param[0];
  var match = Curry._3(param$1[0], gameObject, param[1], /* tuple */[
        StateLogicService$WonderEditor.getEditEngineState(/* () */0),
        StateLogicService$WonderEditor.getRunEngineState(/* () */0)
      ]);
  var match$1 = Curry._2(param$1[2], match[0], match[1]);
  var newMaterial = match$1[0];
  var engineStateTuple = Curry._3(param$1[1], color, newMaterial, /* tuple */[
        match$1[1],
        match$1[2]
      ]);
  var match$2 = StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[/* record */[
          /* arguments : array */[gameObject],
          /* type_ : GameObject */0
        ]], GameObjectEngineService$WonderEditor.initGameObject, Curry._3(param$1[3], gameObject, newMaterial, setMapFunc !== undefined ? Curry._2(setMapFunc, newMaterial, engineStateTuple) : engineStateTuple));
  return StateLogicService$WonderEditor.refreshEditAndRunEngineState(match$2[0], match$2[1]);
}

function replaceMaterialComponentFromNoMapToHasMap(param, color, param$1, setMapFunc) {
  return _replaceMaterialAndRefreshEngineState(/* tuple */[
              param[0],
              param[1]
            ], color, /* tuple */[
              param$1[0],
              param$1[1],
              param$1[2],
              param$1[3]
            ], Curry._1(setMapFunc, param[2]));
}

function replaceMaterialComponentFromHasMapToNoMap(param, color, param$1) {
  return _replaceMaterialAndRefreshEngineState(/* tuple */[
              param[0],
              param[1]
            ], color, /* tuple */[
              param$1[0],
              param$1[1],
              param$1[2],
              param$1[3]
            ], undefined);
}

export {
  getTextureBaseNameAndExtName ,
  renameTextureToEngine ,
  changeTextureMapAndRereshEngineState ,
  _replaceMaterialAndRefreshEngineState ,
  replaceMaterialComponentFromNoMapToHasMap ,
  replaceMaterialComponentFromHasMapToNoMap ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
