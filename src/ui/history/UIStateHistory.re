open Immutable;

let past: ref(Stack.t(AppStore.appState)) = ref(Stack.empty());

let future: ref(Stack.t(AppStore.appState)) = ref(Stack.empty());

let goBack = (currentState) =>
  switch (Stack.first(past^)) {
  | Some(lastState) =>
    future := Stack.addFirst(currentState, future^);
    past := Stack.removeFirstOrRaise(past^);
    lastState
  | None => currentState
  };

let goForward = (currentState) =>
  switch (Stack.first(future^)) {
  | Some(nextState) =>
    past := Stack.addFirst(currentState, past^);
    future := Stack.removeFirstOrRaise(future^);
    nextState
  | None => currentState
  };

let storeUIState = (currentState) => {
  past := Stack.addFirst(currentState, past^);
  future := Stack.empty()
};

let clearUIState = () => {
  past := Stack.empty();
  future := Stack.empty()
};