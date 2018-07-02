

import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as OptionService$WonderEditor from "../../../service/primitive/OptionService.js";
import * as SceneEditorService$WonderEditor from "../../../service/state/editor/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as DiffComponentService$WonderEditor from "../../../service/record/editor/scene/DiffComponentService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../service/state/engine/BasicSourceTextureEngineService.js";

function _checkEditAndRunTextureWithDiff(editTexture, runTexture, type_, editEngineState, runEngineState) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("editMateral and runTexture diff should == materialType diff value", "not"), (function () {
                        var diffValue = DiffComponentService$WonderEditor.getEditEngineComponent(type_, SceneEditorService$WonderEditor.unsafeGetDiffMap(StateEditorService$WonderEditor.getState(/* () */0)));
                        return Contract$WonderLog.Operators[/* = */0](editTexture - runTexture | 0, diffValue);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return /* tuple */[
          runTexture,
          editEngineState,
          runEngineState
        ];
}

function createAndInitTexture(textureName, editEngineState, runEngineState) {
  var match = BasicSourceTextureEngineService$WonderEditor.create(editEngineState);
  var editTexture = match[1];
  var match$1 = BasicSourceTextureEngineService$WonderEditor.create(runEngineState);
  var runTexture = match$1[1];
  return _checkEditAndRunTextureWithDiff(editTexture, runTexture, /* Texture */3, BasicSourceTextureEngineService$WonderEditor.initTexture(editTexture, BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName(textureName + "123", editTexture, match[0])), BasicSourceTextureEngineService$WonderEditor.initTexture(runTexture, BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName(textureName + "123", runTexture, match$1[0])));
}

function buildTextureNodeResult(name, texture) {
  var match = Js_option.isNone(name);
  return /* record */[
          /* name */match ? "" : OptionService$WonderEditor.unsafeGet(name),
          /* type_ : Texture */3,
          /* result : Some */[String(texture)]
        ];
}

export {
  _checkEditAndRunTextureWithDiff ,
  createAndInitTexture ,
  buildTextureNodeResult ,
  
}
/* Log-WonderLog Not a pure module */
