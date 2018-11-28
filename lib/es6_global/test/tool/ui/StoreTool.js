

import * as OptionService$WonderEditor from "../../../src/service/primitive/OptionService.js";

function unsafeGetSceneGraphData(store) {
  return OptionService$WonderEditor.unsafeGet(store[/* sceneTreeState */3][/* sceneGraphData */0]);
}

function setSceneGraphData(sceneGraphData, store) {
  return /* record */[
          /* isEditorAndEngineStart */store[/* isEditorAndEngineStart */0],
          /* isDidMounted */store[/* isDidMounted */1],
          /* mapState */store[/* mapState */2],
          /* sceneTreeState : record */[/* sceneGraphData */sceneGraphData],
          /* updateState */store[/* updateState */4],
          /* inspectorState */store[/* inspectorState */5],
          /* showComponentState */store[/* showComponentState */6]
        ];
}

export {
  unsafeGetSceneGraphData ,
  setSceneGraphData ,
  
}
/* OptionService-WonderEditor Not a pure module */
