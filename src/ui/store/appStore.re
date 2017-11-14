open StringStore;

type ReduxThunk.thunk('a) +=
  | ReplaceState ('a);

type ReduxThunk.thunk(_) +=
  | StringAction (stringAction);

type appState = {stringState};

let state: appState = {stringState: {text: "fck ", age: 0}};

let appReducter = (state: appState, action) =>
  switch action {
  | StringAction(action) => {...state, stringState: stringReducer(state.stringState, action)}
  | ReplaceState(replacedState) => replacedState
  | _ => state
  };