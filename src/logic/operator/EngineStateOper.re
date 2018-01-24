open Immutable;

let deepCopyStateForRestore = EngineStateAdaptor.deepCopyStateForRestore;

let restoreState = EngineStateAdaptor.restoreState;

let getState = () => EngineStateAdaptor.getState(EngineStateAdaptor.getStateData());

let setState = (state) => EngineStateAdaptor.setState(EngineStateAdaptor.getStateData(), state);

let past: ref(Stack.t(Wonderjs.StateDataType.state)) = ref(Stack.empty());

let future: ref(Stack.t(Wonderjs.StateDataType.state)) = ref(Stack.empty());

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

let storeEngineState = (currentState) => {
  past := Stack.addFirst(currentState, past^);
  future := Stack.empty()
};

/* TODO all:move to test->tool */
let clearEngineState = () => {
  past := Stack.empty();
  future := Stack.empty()
};