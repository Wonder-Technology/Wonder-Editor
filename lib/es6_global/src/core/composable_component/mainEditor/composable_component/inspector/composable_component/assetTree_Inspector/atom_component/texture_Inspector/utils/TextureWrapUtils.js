

import * as Log$WonderLog from "../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
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

function changeWrapS(textureId, value) {
  Log$WonderLog.print(/* tuple */[
        "select wraps ",
        value
      ]);
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[textureId],
                /* type_ : Texture */3
              ]], (function (param, param$1) {
                return BasicSourceTextureEngineService$WonderEditor.setWrapS(value, param, param$1);
              }));
}

function changeWrapT(textureId, value) {
  Log$WonderLog.print(/* tuple */[
        "select wrapt ",
        value
      ]);
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[textureId],
                /* type_ : Texture */3
              ]], (function (param, param$1) {
                return BasicSourceTextureEngineService$WonderEditor.setWrapT(value, param, param$1);
              }));
}

export {
  getWrapOptions ,
  changeWrapS ,
  changeWrapT ,
  
}
/* Log-WonderLog Not a pure module */
