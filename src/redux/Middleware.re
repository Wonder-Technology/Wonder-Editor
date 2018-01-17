/*
 * Middleware api:
 * store: gives you access to state before and after the dispatch
 * next: the next function to call in the chain. Any middleware can be async.
 * action: this allows you to look for specific actions to operate on
 * return value can be used by the middleware that called you (optional)
 */

/***
 * logs the action before dispatching and the new state after.
 */
let logger = (store, next, action) => {
  let returnValue = next(action);
  WonderLog.Log.debugWithFunc(
    () => {
      WonderLog.Log.logVar(action) |> ignore;
      WonderLog.Log.logVar(Reductive.Store.getState(store)) |> ignore;
    },
    EditorStateDataEdit.getStateIsDebug()
  );
  returnValue
};


/***
 * middleware that listens for a specific action and calls that function.
 * Allows for async actions.
 */
let thunk = (store, next, action) =>
  switch action {
  | ReduxThunk.Thunk(func) => func(store)
  | _ => next(action)
  };