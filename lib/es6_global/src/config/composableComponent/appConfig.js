'use strict';

import * as Json_decode                  from "../../../../../node_modules/bs-json/lib/es6_global/src/Json_decode.js";
import * as DomAtom$WonderEditor         from "../atomComponent/domAtom.js";
import * as MainEditorAtom$WonderEditor  from "../atomComponent/mainEditorAtom.js";
import * as NumberInputAtom$WonderEditor from "../atomComponent/numberInputAtom.js";

var app_component_config = "\n    {\n        \"number_input\":{\"label\":\"X\",\"onChange\":\"fck2\"},\n        \"main_editor\":{\"state\":\"stringState\",\"dispatch\":\"dispatch\"},\n        \"button\":{\"onClick\":\"undo\",\"text\":\"undoBtn\"}\n    }\n";

function convertAppJsonToRecord(json) {
  return /* record */[
          /* number_input */Json_decode.field("number_input", NumberInputAtom$WonderEditor.numberInputAtom, json),
          /* main_editor */Json_decode.field("main_editor", MainEditorAtom$WonderEditor.mainEditorAtom, json),
          /* button */Json_decode.field("button", DomAtom$WonderEditor.buttonAtom, json)
        ];
}

var appRecord = convertAppJsonToRecord(JSON.parse(app_component_config));

export {
  app_component_config   ,
  convertAppJsonToRecord ,
  appRecord              ,
  
}
/* appRecord Not a pure module */
