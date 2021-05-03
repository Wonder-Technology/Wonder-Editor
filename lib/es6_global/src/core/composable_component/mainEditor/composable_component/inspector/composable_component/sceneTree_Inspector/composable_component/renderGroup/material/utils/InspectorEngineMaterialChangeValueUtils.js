

import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as OptionService$WonderEditor from "../../../../../../../../../../../service/primitive/OptionService.js";
import * as InspectorEngineGameObjectLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/engine/InspectorEngineGameObjectLogicService.js";

function changeMaterialValue(value, param, editorState, inspectorEngineState) {
  var match = InspectorEngineGameObjectLogicService$WonderEditor.getMaterialSphere(/* tuple */[
        editorState,
        inspectorEngineState
      ]);
  if (match !== undefined) {
    var materialSphereMaterialComponent = OptionService$WonderEditor.unsafeGet(Curry._2(param[0], Caml_option.valFromOption(match), inspectorEngineState));
    return Curry._3(param[1], value, materialSphereMaterialComponent, inspectorEngineState);
  } else {
    return inspectorEngineState;
  }
}

export {
  changeMaterialValue ,
  
}
/* OptionService-WonderEditor Not a pure module */
