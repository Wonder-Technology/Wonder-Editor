/* let reducer =
     (
       ~store=TestTool.buildEmptyAppState(),
       ~dispatchFunc=TestTool.getDispatch(),
       ~action,
       ~reducerFunc,
       (),
     ) =>
   reducerFunc((store, dispatchFunc)); */

let getUpdateState = reducerResult =>
  switch (reducerResult) {
  | ReasonReact.Update(reasonStateUpdate) => reasonStateUpdate
  | _ =>
    WonderLog.Log.fatal(
      LogUtils.buildFatalMessage(
        
        ~description={j||j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let isNoUpdate = reducerResult =>
  switch (reducerResult) {
  | ReasonReact.NoUpdate => true
  | _ => false
  };