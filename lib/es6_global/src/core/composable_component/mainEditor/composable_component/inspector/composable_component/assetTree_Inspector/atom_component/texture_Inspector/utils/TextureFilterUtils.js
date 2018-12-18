

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";

function getMagFilterOptions(param) {
  return /* array */[
          /* record */[
            /* key : Nearest */0,
            /* value */"Nearest"
          ],
          /* record */[
            /* key : Linear */1,
            /* value */"Linear"
          ]
        ];
}

function getMinFilterOptions(param) {
  return /* array */[
          /* record */[
            /* key : Nearest */0,
            /* value */"Nearest"
          ],
          /* record */[
            /* key : Linear */1,
            /* value */"Linear"
          ],
          /* record */[
            /* key : Nearest_mipmap_nearest */2,
            /* value */"Nearest_mipmap_nearest"
          ],
          /* record */[
            /* key : Linear_mipmap_nearest */3,
            /* value */"Linear_mipmap_nearest"
          ],
          /* record */[
            /* key : Nearest_mipmap_linear */4,
            /* value */"Nearest_mipmap_linear"
          ],
          /* record */[
            /* key : Linear_mipmap_linear */5,
            /* value */"Linear_mipmap_linear"
          ]
        ];
}

function _changeFilter(textureComponent, value, setFilterFunc) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return StateLogicService$WonderEditor.refreshEngineState(BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(true, textureComponent, Curry._3(setFilterFunc, value, textureComponent, engineState)));
}

function changeMagFilter(textureComponent, value) {
  return _changeFilter(textureComponent, value, BasicSourceTextureEngineService$WonderEditor.setMagFilter);
}

function changeMinFilter(textureComponent, value) {
  return _changeFilter(textureComponent, value, BasicSourceTextureEngineService$WonderEditor.setMinFilter);
}

export {
  getMagFilterOptions ,
  getMinFilterOptions ,
  _changeFilter ,
  changeMagFilter ,
  changeMinFilter ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
