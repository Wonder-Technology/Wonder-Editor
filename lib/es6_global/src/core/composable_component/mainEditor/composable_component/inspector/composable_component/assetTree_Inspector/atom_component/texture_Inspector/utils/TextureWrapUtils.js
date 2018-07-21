

import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";

function getWrapOptions() {
  return /* array */[
          /* record */[
            /* key : REPEAT */2,
            /* value */"REPEAT"
          ],
          /* record */[
            /* key : MIRRORED_REPEAT */1,
            /* value */"MIRRORED_REPEAT"
          ],
          /* record */[
            /* key : CLAMP_TO_EDGE */0,
            /* value */"CLAMP_TO_EDGE"
          ]
        ];
}

function changeWrapS(textureIndex, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[textureIndex],
                /* type_ : Texture */5
              ]], (function (param, param$1) {
                return BasicSourceTextureEngineService$WonderEditor.setWrapS(value, param, param$1);
              }));
}

function changeWrapT(textureIndex, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[textureIndex],
                /* type_ : Texture */5
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
