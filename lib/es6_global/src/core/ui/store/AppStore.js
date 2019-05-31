

import * as Caml_exceptions from "../../../../../../node_modules/bs-platform/lib/es6/caml_exceptions.js";
import * as MapStore$WonderEditor from "./MapStore.js";
import * as UpdateStore$WonderEditor from "./UpdateStore.js";
import * as BottomShowComponentStore$WonderEditor from "../../composable_component/mainEditor/ui/store/BottomShowComponentStore.js";
import * as MainEditorInspectorStore$WonderEditor from "../../composable_component/mainEditor/composable_component/inspector/ui/store/MainEditorInspectorStore.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";

var ReplaceState = Caml_exceptions.create("AppStore-WonderEditor.ReplaceState");

var InitEngineAction = Caml_exceptions.create("AppStore-WonderEditor.InitEngineAction");

var MapAction = Caml_exceptions.create("AppStore-WonderEditor.MapAction");

var InspectorAction = Caml_exceptions.create("AppStore-WonderEditor.InspectorAction");

var UpdateAction = Caml_exceptions.create("AppStore-WonderEditor.UpdateAction");

var ShowComponentAction = Caml_exceptions.create("AppStore-WonderEditor.ShowComponentAction");

var state_001 = /* mapState : record */[/* componentsMap */undefined];

var state_002 = /* updateState : record */[/* componentTypeArr : array */[/* All */1]];

var state_003 = /* inspectorState : record */[/* showComponentMap */ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)];

var state_004 = /* showComponentState : record */[/* currentComponentType : Project */0];

var state = /* record */[
  /* isInitEngine */false,
  state_001,
  state_002,
  state_003,
  state_004
];

function appReducter(state, action) {
  if (action === InitEngineAction) {
    return /* record */[
            /* isInitEngine */true,
            /* mapState */state[/* mapState */1],
            /* updateState */state[/* updateState */2],
            /* inspectorState */state[/* inspectorState */3],
            /* showComponentState */state[/* showComponentState */4]
          ];
  } else if (action[0] === MapAction) {
    return /* record */[
            /* isInitEngine */state[/* isInitEngine */0],
            /* mapState */MapStore$WonderEditor.mapReducer(state[/* mapState */1], action[1]),
            /* updateState */state[/* updateState */2],
            /* inspectorState */state[/* inspectorState */3],
            /* showComponentState */state[/* showComponentState */4]
          ];
  } else if (action[0] === InspectorAction) {
    return /* record */[
            /* isInitEngine */state[/* isInitEngine */0],
            /* mapState */state[/* mapState */1],
            /* updateState */state[/* updateState */2],
            /* inspectorState */MainEditorInspectorStore$WonderEditor.inspectorReducer(state[/* inspectorState */3], action[1]),
            /* showComponentState */state[/* showComponentState */4]
          ];
  } else if (action[0] === UpdateAction) {
    return /* record */[
            /* isInitEngine */state[/* isInitEngine */0],
            /* mapState */state[/* mapState */1],
            /* updateState */UpdateStore$WonderEditor.updateReducer(state[/* updateState */2], action[1]),
            /* inspectorState */state[/* inspectorState */3],
            /* showComponentState */state[/* showComponentState */4]
          ];
  } else if (action[0] === ShowComponentAction) {
    return /* record */[
            /* isInitEngine */state[/* isInitEngine */0],
            /* mapState */state[/* mapState */1],
            /* updateState */state[/* updateState */2],
            /* inspectorState */state[/* inspectorState */3],
            /* showComponentState */BottomShowComponentStore$WonderEditor.showComponentReducer(state[/* showComponentState */4], action[1])
          ];
  } else if (action[0] === ReplaceState) {
    return action[1];
  } else {
    return state;
  }
}

export {
  ReplaceState ,
  InitEngineAction ,
  MapAction ,
  InspectorAction ,
  UpdateAction ,
  ShowComponentAction ,
  state ,
  appReducter ,
  
}
/* state Not a pure module */
