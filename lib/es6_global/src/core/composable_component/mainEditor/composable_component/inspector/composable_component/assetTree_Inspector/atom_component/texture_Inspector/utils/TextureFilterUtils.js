

import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";

function getMagFilterOptions() {
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

function getMinFilterOptions() {
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

function changeMagFilter(textureComponent, value) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return StateLogicService$WonderEditor.refreshEngineState(BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(true, textureComponent, BasicSourceTextureEngineService$WonderEditor.setMagFilter(value, textureComponent, engineState)));
}

function changeMinFilter(textureComponent, value) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return StateLogicService$WonderEditor.refreshEngineState(BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(true, textureComponent, BasicSourceTextureEngineService$WonderEditor.setMinFilter(value, textureComponent, engineState)));
}

export {
  getMagFilterOptions ,
  getMinFilterOptions ,
  changeMagFilter ,
  changeMinFilter ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
