open Immutable;

type ReduxThunk.thunk(_) +=
  | TravelBackward
  | TravelForward;

/* 执行redo and undo */
let past: ref(Immutable.Stack.t(AppStore.appState)) = ref(Stack.empty());

let future: ref(Immutable.Stack.t(AppStore.appState)) = ref(Stack.empty());

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

/* 执行其他操作时，保存当前的state */
let recordHistory = (currentState) => {
  past := Stack.addFirst(currentState, past^);
  future := Stack.empty();
  Js.log(past)
};

let isNeedStoreAction = (action) =>
  switch action {
  | AppStore.MapAction(action_) => false
  | AppStore.DidMountAction => false
  | AppStore.StartEngineAction => false
  | _ => true
  };

let timeTravel = (store, next, action) => {
  let currentState = Reductive.Store.getState(store);
  switch action {
  | TravelBackward => next(AppStore.ReplaceState(goBack(currentState)))
  | TravelForward => next(AppStore.ReplaceState(goForward(currentState)))
  | _ =>
    next(action);
    switch (isNeedStoreAction(action)) {
    | true =>
      let newState = Reductive.Store.getState(store);
      if (currentState !== newState) {
        recordHistory(currentState)
      }
    | _ => ()
    }
  }
};

let thunkedLoggedTimeTravelLogger = (store, next) =>
  next |> timeTravel(store) |> Middleware.logger(store) |> Middleware.thunk(store);