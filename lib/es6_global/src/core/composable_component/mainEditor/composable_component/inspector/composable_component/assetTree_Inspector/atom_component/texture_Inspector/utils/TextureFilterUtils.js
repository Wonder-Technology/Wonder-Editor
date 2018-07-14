

import * as Log$WonderLog from "../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";

function getFilterOptions() {
  return /* array */[
          /* record */[
            /* key : NEAREST */0,
            /* value */"NEAREST"
          ],
          /* record */[
            /* key : LINEAR */1,
            /* value */"LINEAR"
          ],
          /* record */[
            /* key : NEAREST_MIPMAP_NEAREST */2,
            /* value */"NEAREST_MIPMAP_NEAREST"
          ],
          /* record */[
            /* key : LINEAR_MIPMAP_NEAREST */3,
            /* value */"LINEAR_MIPMAP_NEAREST"
          ],
          /* record */[
            /* key : NEAREST_MIPMAP_LINEAR */4,
            /* value */"NEAREST_MIPMAP_LINEAR"
          ],
          /* record */[
            /* key : LINEAR_MIPMAP_LINEAR */5,
            /* value */"LINEAR_MIPMAP_LINEAR"
          ]
        ];
}

function changeMagFilter(textureIndex, value) {
  Log$WonderLog.print(/* tuple */[
        "select filter mag ",
        value
      ]);
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[textureIndex],
                /* type_ : Texture */3
              ]], (function (param, param$1) {
                return BasicSourceTextureEngineService$WonderEditor.setMagFilter(value, param, param$1);
              }));
}

function changeMinFilter(textureIndex, value) {
  Log$WonderLog.print(/* tuple */[
        "select filter min ",
        value
      ]);
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[textureIndex],
                /* type_ : Texture */3
              ]], (function (param, param$1) {
                return BasicSourceTextureEngineService$WonderEditor.setMinFilter(value, param, param$1);
              }));
}

export {
  getFilterOptions ,
  changeMagFilter ,
  changeMinFilter ,
  
}
/* Log-WonderLog Not a pure module */
