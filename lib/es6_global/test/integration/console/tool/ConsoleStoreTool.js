

import * as TestTool$WonderEditor from "../../../tool/TestTool.js";

function buildStore($staropt$star, param) {
  var currentComponentType = $staropt$star !== undefined ? $staropt$star : /* Project */0;
  var uiState = TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return /* record */[
          /* isEditorAndEngineStart */uiState[/* isEditorAndEngineStart */0],
          /* mapState */uiState[/* mapState */1],
          /* updateState */uiState[/* updateState */2],
          /* inspectorState */uiState[/* inspectorState */3],
          /* showComponentState : record */[/* currentComponentType */currentComponentType]
        ];
}

export {
  buildStore ,
  
}
/* TestTool-WonderEditor Not a pure module */
