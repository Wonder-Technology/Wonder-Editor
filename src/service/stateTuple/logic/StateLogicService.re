/* let getEditEngineState = () =>
     EngineStateDataEditorService.getEditEngineStateData()
     |> StateEngineService.getStateFromData;

   let setEditEngineState = state =>
     state
     |> StateEngineService.setStateToData(
          EngineStateDataEditorService.getEditEngineStateData(),
        )
     |> ignore; */

/* let getRunEngineState = () =>
     EngineStateDataEditorService.getRunEngineStateData()
     |> StateEngineService.getStateFromData;

   let setRunEngineState = state =>
     state
     |> StateEngineService.setStateToData(
          EngineStateDataEditorService.getRunEngineStateData(),
        )
     |> ignore; */

/* let getEngineStateToGetData = handleFunc => getRunEngineState() |> handleFunc; */
let getEngineStateToGetData = handleFunc =>
  StateEngineService.unsafeGetState() |> handleFunc;

/* let getAndSetEngineState = handleFunc => {
     getEditEngineState() |> handleFunc |> setEditEngineState;
     getRunEngineState() |> handleFunc |> setRunEngineState;
   }; */

let getAndSetEngineState = handleFunc =>
  StateEngineService.unsafeGetState()
  |> handleFunc
  |> StateEngineService.setState
  |> ignore;

let refreshEngineState = engineState =>
  engineState
  |> DirectorEngineService.loopBody(0.)
  |> StateEngineService.setState
  |> ignore;

let getAndRefreshEngineState = () =>
  StateEngineService.unsafeGetState()
  |> DirectorEngineService.loopBody(0.)
  |> StateEngineService.setState
  |> ignore;

let getAndRefreshEngineStateWithFunc = handleFunc =>
  StateEngineService.unsafeGetState()
  |> handleFunc
  |> DirectorEngineService.loopBody(0.)
  |> StateEngineService.setState
  |> ignore;

/* let _computeEditComponent = (diff, componentForRun) => componentForRun + diff;

   let _getDiffValue = type_ =>
     StateEditorService.getState()
     |> SceneEditorService.unsafeGetDiffMap
     |> DiffComponentService.getEditEngineComponent(type_);

   let _getWithDiffHandleFunc =
       (diffArgumentArrForRun: array(diffArgument), handleFunc) => {
     let _argumentArrayForRun =
       diffArgumentArrForRun
       |> Js.Array.reduce(
            (arr, {arguments, type_}) =>
              arguments
              |> Js.Array.reduce(
                   (arr, component) => arr |> ArrayService.push(component),
                   arr,
                 ),
            [||],
          );

     let _argumentArrayForEdit =
       diffArgumentArrForRun
       |> Js.Array.reduce(
            (arr, {arguments, type_}) => {
              let diffValue = _getDiffValue(type_);
              arguments
              |> Js.Array.reduce(
                   (arr, component) =>
                     arr
                     |> ArrayService.push(
                          _computeEditComponent(diffValue, component),
                        ),
                   arr,
                 );
            },
            [||],
          );
     (
       _argumentArrayForEdit
       |> Obj.magic
       |> Js.Array.reduce(
            (handleFunc, component) => handleFunc(component) |> Obj.magic,
            handleFunc |> Obj.magic,
          ),
       _argumentArrayForRun
       |> Obj.magic
       |> Js.Array.reduce(
            (handleFunc, component) => handleFunc(component) |> Obj.magic,
            handleFunc |> Obj.magic,
          ),
     );
   };

   let handleFuncWithDiff =
       (
         diffArgumentArrForRun: array(diffArgument),
         handleFunc,
         (editEngineState, runEngineState),
       ) => {
     let (handleFuncForEdit, handleFuncForRun) =
       _getWithDiffHandleFunc(diffArgumentArrForRun, handleFunc);

     (editEngineState |> handleFuncForEdit, runEngineState |> handleFuncForRun);
   };

   let getAndSetEngineStateWithDiff =
       (diffArgumentArrForRun: array(diffArgument), handleFunc) => {
     let (handleFuncForEdit, handleFuncForRun) =
       _getWithDiffHandleFunc(diffArgumentArrForRun, handleFunc);

     getRunEngineState() |> handleFuncForRun |> setRunEngineState;

     getEditEngineState() |> handleFuncForEdit |> setEditEngineState;
   };

   let getAndRefreshEngineStateWithDiff =
       (diffArgumentArrForRun: array(diffArgument), handleFunc) => {
     let (handleFuncForEdit, handleFuncForRun) =
       _getWithDiffHandleFunc(diffArgumentArrForRun, handleFunc);

     getRunEngineState()
     |> handleFuncForRun
     |> DirectorEngineService.loopBody(0.)
     |> setRunEngineState;

     getEditEngineState()
     |> handleFuncForEdit
     |> DirectorEngineService.loopBody(0.)
     |> setEditEngineState;
   }; */

let getEditorState = handleFunc => StateEditorService.getState() |> handleFunc;

let getAndSetEditorState = handleFunc =>
  StateEditorService.getState()
  |> handleFunc
  |> StateEditorService.setState
  |> ignore;

/* let getStateToGetData = handleFunc =>
   (StateEditorService.getState(), getRunEngineState()) |> handleFunc; */
let getStateToGetData = handleFunc =>
  (StateEditorService.getState(), StateEngineService.unsafeGetState())
  |> handleFunc;
/*
 /* TODO remove diff */
 let getEditEngineComponent = (type_, runComponent) =>
   /* _getDiffValue(type_) + runComponent; */
   runComponent; */