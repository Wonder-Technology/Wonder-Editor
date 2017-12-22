open MapStore;

type appState = {
  isEditorAndEngineStart: bool,
  isDidMounted: bool,
  mapState
};

type ReduxThunk.thunk('a) +=
  | ReplaceState ('a);

type ReduxThunk.thunk(_) +=
  | IsDidMounted
  | StartEngineAction
  | MapAction (mapAction(componentsMap));

let state: appState = {
  isEditorAndEngineStart: false,
  isDidMounted: false,
  mapState: {componentsMap: None}
};

let appReducter = (state: appState, action) =>
  switch action {
  | IsDidMounted => {...state, isDidMounted: true}
  | StartEngineAction => {...state, isEditorAndEngineStart: true}
  | MapAction(action) => {...state, mapState: mapReducer(state.mapState, action)}
  | ReplaceState(replacedState) => replacedState
  | _ => state
  };