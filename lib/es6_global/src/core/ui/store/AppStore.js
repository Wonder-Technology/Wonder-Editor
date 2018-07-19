

import * as Caml_exceptions from "../../../../../../node_modules/bs-platform/lib/es6/caml_exceptions.js";
import * as MapStore$WonderEditor from "./MapStore.js";
import * as MainEditorSceneTreeStore$WonderEditor from "../../composable_component/mainEditor/composable_component/sceneTree/ui/store/MainEditorSceneTreeStore.js";

var ReplaceState = Caml_exceptions.create("AppStore-WonderEditor.ReplaceState");

var ReLoad = Caml_exceptions.create("AppStore-WonderEditor.ReLoad");

var IsDidMounted = Caml_exceptions.create("AppStore-WonderEditor.IsDidMounted");

var StartEngineAction = Caml_exceptions.create("AppStore-WonderEditor.StartEngineAction");

var SceneTreeAction = Caml_exceptions.create("AppStore-WonderEditor.SceneTreeAction");

var MapAction = Caml_exceptions.create("AppStore-WonderEditor.MapAction");

function appReducter(state, action) {
  if (action === ReLoad) {
    return state;
  } else if (action === IsDidMounted) {
    return /* record */[
            /* isEditorAndEngineStart */state[/* isEditorAndEngineStart */0],
            /* isDidMounted */true,
            /* mapState */state[/* mapState */2],
            /* sceneTreeState */state[/* sceneTreeState */3]
          ];
  } else if (action === StartEngineAction) {
    return /* record */[
            /* isEditorAndEngineStart */true,
            /* isDidMounted */state[/* isDidMounted */1],
            /* mapState */state[/* mapState */2],
            /* sceneTreeState */state[/* sceneTreeState */3]
          ];
  } else if (action[0] === SceneTreeAction) {
    return /* record */[
            /* isEditorAndEngineStart */state[/* isEditorAndEngineStart */0],
            /* isDidMounted */state[/* isDidMounted */1],
            /* mapState */state[/* mapState */2],
            /* sceneTreeState */MainEditorSceneTreeStore$WonderEditor.sceneTreeReducer(state[/* sceneTreeState */3], action[1])
          ];
  } else if (action[0] === MapAction) {
    return /* record */[
            /* isEditorAndEngineStart */state[/* isEditorAndEngineStart */0],
            /* isDidMounted */state[/* isDidMounted */1],
            /* mapState */MapStore$WonderEditor.mapReducer(state[/* mapState */2], action[1]),
            /* sceneTreeState */state[/* sceneTreeState */3]
          ];
  } else if (action[0] === ReplaceState) {
    return action[1];
  } else {
    return state;
  }
}

var state = /* record */[
  /* isEditorAndEngineStart */false,
  /* isDidMounted */false,
  /* mapState : record */[/* componentsMap */undefined],
  /* sceneTreeState : record */[/* sceneGraphData */undefined]
];

export {
  ReplaceState ,
  ReLoad ,
  IsDidMounted ,
  StartEngineAction ,
  SceneTreeAction ,
  MapAction ,
  state ,
  appReducter ,
  
}
/* No side effect */
