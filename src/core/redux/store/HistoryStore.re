
/* type ReduxThunk.thunk(_) +=
  | TravelBackward
  | TravelForward;

/* 执行redo and undo */
let past: ref(StackService.t(AppStore.appState)) = ref(StackService.empty());

let future: ref(StackService.t(AppStore.appState)) = ref(StackService.empty());

let undo = (currentState) =>
  switch (StackService.first(past^)) {
  | Some(lastState) =>
    future := StackService.addFirst(currentState, future^);
    past := StackService.removeFirstOrRaise(past^);
    lastState
  | None => currentState
  };

let redo = (currentState) =>
  switch (StackService.first(future^)) {
  | Some(nextState) =>
    past := StackService.addFirst(currentState, past^);
    future := StackService.removeFirstOrRaise(future^);
    nextState
  | None => currentState
  };

/* 执行其他操作时，保存当前的state */
let recordHistory = (currentState) => {
  past := StackService.addFirst(currentState, past^);
  future := StackService.empty()
};

let isNeedStoreAction = (action) =>
  switch action {
  | AppStore.MapAction(action_) => false
  | AppStore.StartEngineAction => false
  | AppStore.IsDidMounted => false
  | _ => true
  };

let timeTravel = (store, next, action) => {
  let currentState = Reductive.Store.getState(store);
  switch action {
  | TravelBackward => next(AppStore.ReplaceState(undo(currentState)))
  | TravelForward => next(AppStore.ReplaceState(redo(currentState)))
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

*/
let thunkedLoggedTimeTravelLogger = (store, next) =>
  /* next |> timeTravel(store) |> Middleware.logger(store) |> Middleware.thunk(store); */
  next |> Middleware.logger(store) |> Middleware.thunk(store); 