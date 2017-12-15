open MapStore;

type appState = {
  isEditorAndEngineStart: bool,
  mapState
};

type ReduxThunk.thunk('a) +=
  | ReplaceState ('a);

type ReduxThunk.thunk(_) +=
  | StartEngineAction
  | MapAction (mapAction(componentsMap));

let state: appState = {isEditorAndEngineStart: false, mapState: {componentsMap: None}};

let appReducter = (state: appState, action) =>
  switch action {
  | StartEngineAction => {...state, isEditorAndEngineStart: true}
  | MapAction(action) => {...state, mapState: mapReducer(state.mapState, action)}
  | ReplaceState(replacedState) => replacedState
  | _ => state
  };