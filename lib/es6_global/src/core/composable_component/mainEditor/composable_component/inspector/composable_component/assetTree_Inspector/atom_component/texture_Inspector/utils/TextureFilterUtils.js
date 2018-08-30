

import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";

function getFilterOptions() {
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

function changeMagFilter(textureIndex, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[textureIndex],
                /* type_ : Texture */11
              ]], (function (param, param$1) {
                return BasicSourceTextureEngineService$WonderEditor.setMagFilter(value, param, param$1);
              }));
}

function changeMinFilter(textureIndex, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[textureIndex],
                /* type_ : Texture */11
              ]], (function (param, param$1) {
                return BasicSourceTextureEngineService$WonderEditor.setMinFilter(value, param, param$1);
              }));
}

export {
  getFilterOptions ,
  changeMagFilter ,
  changeMinFilter ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
