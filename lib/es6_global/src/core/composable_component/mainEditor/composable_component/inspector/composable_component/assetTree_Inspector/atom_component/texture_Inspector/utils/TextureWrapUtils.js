

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
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return BasicSourceTextureEngineService$WonderEditor.setWrapS(value, textureIndex, param);
              }));
}

function changeWrapT(textureIndex, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return BasicSourceTextureEngineService$WonderEditor.setWrapT(value, textureIndex, param);
              }));
}

export {
  getWrapOptions ,
  changeWrapS ,
  changeWrapT ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
