

import * as Caml_exceptions from "../../../../../../node_modules/bs-platform/lib/es6/caml_exceptions.js";
import * as MapStore$WonderEditor from "./MapStore.js";
import * as UpdateStore$WonderEditor from "./UpdateStore.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as MainEditorInspectorStore$WonderEditor from "../../composable_component/mainEditor/composable_component/inspector/ui/store/MainEditorInspectorStore.js";
import * as MainEditorSceneTreeStore$WonderEditor from "../../composable_component/mainEditor/composable_component/sceneTree/ui/store/MainEditorSceneTreeStore.js";

var ReplaceState = Caml_exceptions.create("AppStore-WonderEditor.ReplaceState");

var IsDidMounted = Caml_exceptions.create("AppStore-WonderEditor.IsDidMounted");

var StartEngineAction = Caml_exceptions.create("AppStore-WonderEditor.StartEngineAction");

var SceneTreeAction = Caml_exceptions.create("AppStore-WonderEditor.SceneTreeAction");

var MapAction = Caml_exceptions.create("AppStore-WonderEditor.MapAction");

var InspectorAction = Caml_exceptions.create("AppStore-WonderEditor.InspectorAction");

var UpdateAction = Caml_exceptions.create("AppStore-WonderEditor.UpdateAction");

var state_002 = /* mapState : record */[/* componentsMap */undefined];

var state_003 = /* sceneTreeState : record */[/* sceneGraphData */undefined];

var state_004 = /* updateState : record */[/* componentTypeArr : array */[/* All */0]];

var state_005 = /* inspectorState : record */[/* showComponentMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0)];

var state = /* record */[
  /* isEditorAndEngineStart */false,
  /* isDidMounted */false,
  state_002,
  state_003,
  state_004,
  state_005
];

function appReducter(state, action) {
  if (action === IsDidMounted) {
    return /* record */[
            /* isEditorAndEngineStart */state[/* isEditorAndEngineStart */0],
            /* isDidMounted */true,
            /* mapState */state[/* mapState */2],
            /* sceneTreeState */state[/* sceneTreeState */3],
            /* updateState */state[/* updateState */4],
            /* inspectorState */state[/* inspectorState */5]
          ];
  } else if (action === StartEngineAction) {
    return /* record */[
            /* isEditorAndEngineStart */true,
            /* isDidMounted */state[/* isDidMounted */1],
            /* mapState */state[/* mapState */2],
            /* sceneTreeState */state[/* sceneTreeState */3],
            /* updateState */state[/* updateState */4],
            /* inspectorState */state[/* inspectorState */5]
          ];
  } else if (action[0] === SceneTreeAction) {
    return /* record */[
            /* isEditorAndEngineStart */state[/* isEditorAndEngineStart */0],
            /* isDidMounted */state[/* isDidMounted */1],
            /* mapState */state[/* mapState */2],
            /* sceneTreeState */MainEditorSceneTreeStore$WonderEditor.sceneTreeReducer(state[/* sceneTreeState */3], action[1]),
            /* updateState */state[/* updateState */4],
            /* inspectorState */state[/* inspectorState */5]
          ];
  } else if (action[0] === MapAction) {
    return /* record */[
            /* isEditorAndEngineStart */state[/* isEditorAndEngineStart */0],
            /* isDidMounted */state[/* isDidMounted */1],
            /* mapState */MapStore$WonderEditor.mapReducer(state[/* mapState */2], action[1]),
            /* sceneTreeState */state[/* sceneTreeState */3],
            /* updateState */state[/* updateState */4],
            /* inspectorState */state[/* inspectorState */5]
          ];
  } else if (action[0] === InspectorAction) {
    return /* record */[
            /* isEditorAndEngineStart */state[/* isEditorAndEngineStart */0],
            /* isDidMounted */state[/* isDidMounted */1],
            /* mapState */state[/* mapState */2],
            /* sceneTreeState */state[/* sceneTreeState */3],
            /* updateState */state[/* updateState */4],
            /* inspectorState */MainEditorInspectorStore$WonderEditor.inspectorReducer(state[/* inspectorState */5], action[1])
          ];
  } else if (action[0] === UpdateAction) {
    return /* record */[
            /* isEditorAndEngineStart */state[/* isEditorAndEngineStart */0],
            /* isDidMounted */state[/* isDidMounted */1],
            /* mapState */state[/* mapState */2],
            /* sceneTreeState */state[/* sceneTreeState */3],
            /* updateState */UpdateStore$WonderEditor.updateReducer(state[/* updateState */4], action[1]),
            /* inspectorState */state[/* inspectorState */5]
          ];
  } else if (action[0] === ReplaceState) {
    return action[1];
  } else {
    return state;
  }
}

export {
  ReplaceState ,
  IsDidMounted ,
  StartEngineAction ,
  SceneTreeAction ,
  MapAction ,
  InspectorAction ,
  UpdateAction ,
  state ,
  appReducter ,
  
}
/* state Not a pure module */
