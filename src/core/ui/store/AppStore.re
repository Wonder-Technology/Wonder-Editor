open MapStore;

open UpdateStore;

open MainEditorSceneTreeStore;

type appState = {
  isEditorAndEngineStart: bool,
  isDidMounted: bool,
  mapState,
  sceneTreeState,
  updateState,
};

type ReduxThunk.thunk('a) +=
  | ReplaceState('a);

type ReduxThunk.thunk(_) +=
  | IsDidMounted
  | StartEngineAction
  | SceneTreeAction(sceneTreeAction(sceneTreeDataType))
  | MapAction(mapAction(componentsMap))
  | UpdateAction(updateAction(updateComponentTypeArr));

let state: appState = {
  isEditorAndEngineStart: false,
  isDidMounted: false,
  mapState: {
    componentsMap: None,
  },
  sceneTreeState: {
    sceneGraphData: None,
  },
  updateState: {
    componentTypeArr: [|All|],
  },
};

let appReducter = (state: appState, action) =>
  switch (action) {
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
  | UpdateAction(action) => {
      ...state,
      updateState: updateReducer(state.updateState, action),
    }
  | ReplaceState(replacedState) => replacedState
  | _ => state
  };