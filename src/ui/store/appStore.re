open MapStore;

type appState = {
  isDidMount: bool,
  isEditorAndEngineStart: bool,
  mapState
};

type ReduxThunk.thunk('a) +=
  | ReplaceState ('a);

type ReduxThunk.thunk(_) +=
  | DidMountAction
  | StartEngineAction
  | MapAction (mapAction(componentsMap));

let state: appState = {
  isDidMount: false,
  isEditorAndEngineStart: false,
  mapState: {componentsMap: None}
};

let appReducter = (state: appState, action) =>
  switch action {
  | DidMountAction => {...state, isDidMount: true}
  | StartEngineAction => {...state, isEditorAndEngineStart: true}
  | MapAction(action) => {...state, mapState: mapReducer(state.mapState, action)}
  | ReplaceState(replacedState) => replacedState
  | _ => state
  };