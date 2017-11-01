open StringStore;

type ReduxThunk.thunk(_) +=
  | StringAction (stringAction);

type ReduxThunk.thunk('a) +=
  | ReplaceState ('a);

type appState = {notACounter: string};

let state = {
  notACounter:"hehe "
};

let appReducter = (state: appState, action) =>
  switch action {
  | StringAction(action) => {...state, notACounter: stringReduce(state.notACounter, action)}
  | ReplaceState(replacedState) => replacedState
  | _ => state
  };