

import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/StateEngineService.js";
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

function changeWrapS(textureComponent, value) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return StateLogicService$WonderEditor.refreshEngineState(BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(true, textureComponent, BasicSourceTextureEngineService$WonderEditor.setWrapS(value, textureComponent, engineState)));
}

function changeWrapT(textureComponent, value) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return StateLogicService$WonderEditor.refreshEngineState(BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(true, textureComponent, BasicSourceTextureEngineService$WonderEditor.setWrapT(value, textureComponent, engineState)));
}

export {
  getWrapOptions ,
  changeWrapS ,
  changeWrapT ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
