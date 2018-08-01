

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as SceneEditorService$WonderEditor from "../../../service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as DiffComponentService$WonderEditor from "../../../service/record/editor/scene/DiffComponentService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../service/state/engine/BasicSourceTextureEngineService.js";

function _checkEditAndRunTextureWithDiff(param, type_, editEngineState, runEngineState) {
  var runTexture = param[1];
  var editTexture = param[0];
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
  return _checkEditAndRunTextureWithDiff(/* tuple */[
              editTexture,
              runTexture
            ], /* Texture */7, BasicSourceTextureEngineService$WonderEditor.initTexture(editTexture, BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName(textureName, editTexture, match[0])), BasicSourceTextureEngineService$WonderEditor.initTexture(runTexture, BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName(textureName, runTexture, match$1[0])));
}

export {
  _checkEditAndRunTextureWithDiff ,
  createAndInitTexture ,
  
}
/* Log-WonderLog Not a pure module */
