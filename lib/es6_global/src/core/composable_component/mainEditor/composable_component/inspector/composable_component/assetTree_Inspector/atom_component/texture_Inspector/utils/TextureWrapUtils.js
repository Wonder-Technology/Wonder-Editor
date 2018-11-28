

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
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

function _changeWrap(textureComponent, value, setWrapFunc) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return StateLogicService$WonderEditor.refreshEngineState(BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(true, textureComponent, Curry._3(setWrapFunc, value, textureComponent, engineState)));
}

function changeWrapS(textureComponent, value) {
  return _changeWrap(textureComponent, value, BasicSourceTextureEngineService$WonderEditor.setWrapS);
}

function changeWrapT(textureComponent, value) {
  return _changeWrap(textureComponent, value, BasicSourceTextureEngineService$WonderEditor.setWrapT);
}

export {
  getWrapOptions ,
  _changeWrap ,
  changeWrapS ,
  changeWrapT ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
