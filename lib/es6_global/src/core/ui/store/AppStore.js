

import * as Caml_exceptions from "../../../../../../node_modules/bs-platform/lib/es6/caml_exceptions.js";
import * as MapStore$WonderEditor from "./MapStore.js";
import * as UpdateStore$WonderEditor from "./UpdateStore.js";
import * as BottomShowComponentStore$WonderEditor from "../../composable_component/mainEditor/ui/store/BottomShowComponentStore.js";
import * as MainEditorInspectorStore$WonderEditor from "../../composable_component/mainEditor/composable_component/inspector/ui/store/MainEditorInspectorStore.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";

var ReplaceState = Caml_exceptions.create("AppStore-WonderEditor.ReplaceState");

var IsDidMounted = Caml_exceptions.create("AppStore-WonderEditor.IsDidMounted");

var StartEngineAction = Caml_exceptions.create("AppStore-WonderEditor.StartEngineAction");

var MapAction = Caml_exceptions.create("AppStore-WonderEditor.MapAction");

var InspectorAction = Caml_exceptions.create("AppStore-WonderEditor.InspectorAction");

var UpdateAction = Caml_exceptions.create("AppStore-WonderEditor.UpdateAction");

var ShowComponentAction = Caml_exceptions.create("AppStore-WonderEditor.ShowComponentAction");

var state_002 = /* mapState : record */[/* componentsMap */undefined];

var state_003 = /* updateState : record */[/* componentTypeArr : array */[/* All */1]];

var state_004 = /* inspectorState : record */[/* showComponentMap */ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)];

var state_005 = /* showComponentState : record */[/* currentComponentType : Project */0];

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
            /* updateState */state[/* updateState */3],
            /* inspectorState */state[/* inspectorState */4],
            /* showComponentState */state[/* showComponentState */5]
          ];
  } else if (action === StartEngineAction) {
    return /* record */[
            /* isEditorAndEngineStart */true,
            /* isDidMounted */state[/* isDidMounted */1],
            /* mapState */state[/* mapState */2],
            /* updateState */state[/* updateState */3],
            /* inspectorState */state[/* inspectorState */4],
            /* showComponentState */state[/* showComponentState */5]
          ];
  } else if (action[0] === MapAction) {
    return /* record */[
            /* isEditorAndEngineStart */state[/* isEditorAndEngineStart */0],
            /* isDidMounted */state[/* isDidMounted */1],
            /* mapState */MapStore$WonderEditor.mapReducer(state[/* mapState */2], action[1]),
            /* updateState */state[/* updateState */3],
            /* inspectorState */state[/* inspectorState */4],
            /* showComponentState */state[/* showComponentState */5]
          ];
  } else if (action[0] === InspectorAction) {
    return /* record */[
            /* isEditorAndEngineStart */state[/* isEditorAndEngineStart */0],
            /* isDidMounted */state[/* isDidMounted */1],
            /* mapState */state[/* mapState */2],
            /* updateState */state[/* updateState */3],
            /* inspectorState */MainEditorInspectorStore$WonderEditor.inspectorReducer(state[/* inspectorState */4], action[1]),
            /* showComponentState */state[/* showComponentState */5]
          ];
  } else if (action[0] === UpdateAction) {
    return /* record */[
            /* isEditorAndEngineStart */state[/* isEditorAndEngineStart */0],
            /* isDidMounted */state[/* isDidMounted */1],
            /* mapState */state[/* mapState */2],
            /* updateState */UpdateStore$WonderEditor.updateReducer(state[/* updateState */3], action[1]),
            /* inspectorState */state[/* inspectorState */4],
            /* showComponentState */state[/* showComponentState */5]
          ];
  } else if (action[0] === ShowComponentAction) {
    return /* record */[
            /* isEditorAndEngineStart */state[/* isEditorAndEngineStart */0],
            /* isDidMounted */state[/* isDidMounted */1],
            /* mapState */state[/* mapState */2],
            /* updateState */state[/* updateState */3],
            /* inspectorState */state[/* inspectorState */4],
            /* showComponentState */BottomShowComponentStore$WonderEditor.showComponentReducer(state[/* showComponentState */5], action[1])
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
  MapAction ,
  InspectorAction ,
  UpdateAction ,
  ShowComponentAction ,
  state ,
  appReducter ,
  
}
/* state Not a pure module */
