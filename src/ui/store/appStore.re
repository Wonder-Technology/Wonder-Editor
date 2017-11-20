open StringStore;

open MapStore;

type appState = {
  isDidMount: bool,
  stringState,
  mapState
};

type ReduxThunk.thunk('a) +=
  | ReplaceState ('a);

type ReduxThunk.thunk(_) +=
  | DidMountAction
  | MapAction (mapAction(componentsMap))
  | StringAction (stringAction);

let state: appState = {
  isDidMount: false,
  stringState: {text: "what fck:fck a", age: 0},
  mapState: {componentsMap: None}
};

let appReducter = (state: appState, action) =>
  switch action {
  | DidMountAction => {...state, isDidMount: true}
  | MapAction(action) => {...state, mapState: mapReducer(state.mapState, action)}
  | StringAction(action) => {...state, stringState: stringReducer(state.stringState, action)}
  | ReplaceState(replacedState) => replacedState
  | _ => state
  };