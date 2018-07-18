

import * as StateEngineService$WonderEditor from "../engine/StateEngineService.js";
import * as CreateAssetStateAssetService$WonderEditor from "../asset/CreateAssetStateAssetService.js";
import * as CreateEditorStateEditorService$WonderEditor from "../editor/CreateEditorStateEditorService.js";

var editorStateData = /* record */[
  /* editorState */CreateEditorStateEditorService$WonderEditor.create(/* () */0),
  /* assetState */CreateAssetStateAssetService$WonderEditor.create(/* () */0),
  /* isDebug */true,
  /* engineStateDataForEdit */StateEngineService$WonderEditor.createStateData(/* () */0),
  /* engineStateDataForRun */StateEngineService$WonderEditor.createStateData(/* () */0)
];

export {
  editorStateData ,
  
}
/* editorStateData Not a pure module */
