/* todo all: all store related logic should move to service/state/ui/ */
open MapStore;

open MainEditorSceneTreeStore;

type appState = {
  isEditorAndEngineStart: bool,
  isDidMounted: bool,
  mapState,
  sceneTreeState,
};

type ReduxThunk.thunk('a) +=
  | ReplaceState('a);

type ReduxThunk.thunk(_) +=
  | ReLoad
  | IsDidMounted
  | StartEngineAction
  | SceneTreeAction(sceneTreeAction(sceneTreeDataType))
  | MapAction(mapAction(componentsMap));

let state: appState = {
  isEditorAndEngineStart: false,
  isDidMounted: false,
  mapState: {
    componentsMap: None,
  },
  sceneTreeState: {
    sceneGraphData: None,
  },
};

let appReducter = (state: appState, action) =>
  switch (action) {
  | ReLoad => state
  | IsDidMounted => {...state, isDidMounted: true}
  | StartEngineAction => {...state, isEditorAndEngineStart: true}
  | SceneTreeAction(action) => {
      ...state,
      sceneTreeState: sceneTreeReducer(state.sceneTreeState, action),
    }
  | MapAction(action) => {
      ...state,
      mapState: mapReducer(state.mapState, action),
    }
  | ReplaceState(replacedState) => replacedState
  | _ => state
  };