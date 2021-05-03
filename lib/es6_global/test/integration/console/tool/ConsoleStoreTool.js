

import * as TestTool$WonderEditor from "../../../tool/TestTool.js";

function buildStore($staropt$star, _) {
  var currentComponentType = $staropt$star !== undefined ? $staropt$star : /* Project */0;
  var store = TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return /* record */[
          /* isEditorAndEngineStart */store[/* isEditorAndEngineStart */0],
          /* isDidMounted */store[/* isDidMounted */1],
          /* mapState */store[/* mapState */2],
          /* updateState */store[/* updateState */3],
          /* inspectorState */store[/* inspectorState */4],
          /* showComponentState : record */[/* currentComponentType */currentComponentType]
        ];
}

export {
  buildStore ,
  
}
/* TestTool-WonderEditor Not a pure module */
