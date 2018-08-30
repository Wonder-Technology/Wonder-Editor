

import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";

function getWrapOptions() {
  return /* array */[
          /* record */[
            /* key : Repeat */2,
            /* value */"Repeat"
          ],
          /* record */[
            /* key : Mirrored_repeat */1,
            /* value */"Mirrored_repeat"
          ],
          /* record */[
            /* key : Clamp_to_edge */0,
            /* value */"Clamp_to_edge"
          ]
        ];
}

function changeWrapS(textureIndex, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[textureIndex],
                /* type_ : Texture */11
              ]], (function (param, param$1) {
                return BasicSourceTextureEngineService$WonderEditor.setWrapS(value, param, param$1);
              }));
}

function changeWrapT(textureIndex, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[textureIndex],
                /* type_ : Texture */11
              ]], (function (param, param$1) {
                return BasicSourceTextureEngineService$WonderEditor.setWrapT(value, param, param$1);
              }));
}

export {
  getWrapOptions ,
  changeWrapS ,
  changeWrapT ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
