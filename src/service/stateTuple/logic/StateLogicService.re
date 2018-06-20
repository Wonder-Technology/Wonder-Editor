open DiffType;
let getEditEngineState = () =>
  EngineStateDataEditorService.getEditEngineStateData()
  |> StateEngineService.getStateFromData;

let setEditEngineState = state =>
  state
  |> StateEngineService.setStateToData(
       EngineStateDataEditorService.getEditEngineStateData(),
     )
  |> ignore;

let getRunEngineState = () =>
  EngineStateDataEditorService.getRunEngineStateData()
  |> StateEngineService.getStateFromData;

let setRunEngineState = state =>
  state
  |> StateEngineService.setStateToData(
       EngineStateDataEditorService.getRunEngineStateData(),
     )
  |> ignore;

let getEngineStateToGetData = handleFunc => getRunEngineState() |> handleFunc;

let getAndSetEditAndRunEngineState = handleFunc => {
  getEditEngineState() |> handleFunc |> setEditEngineState;
  getRunEngineState() |> handleFunc |> setRunEngineState;
};
let getAndRefreshEditAndRunEngineState = handleFunc => {
  getEditEngineState()
  |> handleFunc
  |> DirectorEngineService.loopBody(0.)
  |> setEditEngineState;
  getRunEngineState()
  |> handleFunc
  |> DirectorEngineService.loopBody(0.)
  |> setRunEngineState;
};

let getAndSetEditEngineState = handleFunc =>
  getEditEngineState() |> handleFunc |> setEditEngineState;

let getAndSetRunEngineState = handleFunc =>
  getRunEngineState() |> handleFunc |> setRunEngineState;

let _computeEditComponent = (diff, componentForRun) => componentForRun + diff;

let getAndRefreshEngineStateWithDiff =
    (argumentArrayForRun, type_, handleFunc) => {
  let diffValue =
    StateEditorService.getState()
    |> SceneEditorService.unsafeGetDiffMap
    |> DiffComponentService.getEditEngineComponent(type_);
  let argumentArrayForEdit =
    argumentArrayForRun
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. arr, component) =>
           arr
           |> ArrayService.push(_computeEditComponent(diffValue, component)),
         [||],
       );
  let handleFunc = Obj.magic(handleFunc);
  let handleFuncForRun =
    argumentArrayForRun
    |> Obj.magic
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. handleFunc, component) => handleFunc(component) |> Obj.magic,
         handleFunc,
       );
  let handleFuncForEdit =
    argumentArrayForEdit
    |> Obj.magic
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. handleFunc, component) => handleFunc(component) |> Obj.magic,
         handleFunc,
       );
  getRunEngineState()
  |> handleFuncForRun
  |> DirectorEngineService.loopBody(0.)
  |> setRunEngineState;
  getEditEngineState()
  |> handleFuncForEdit
  |> DirectorEngineService.loopBody(0.)
  |> setEditEngineState;
};

let getAndRefreshEngineStateWithDiffTest =
    (diffArgumentArrForRun: array(diffArgument), handleFunc) => {
  let argumentArrayForRun =
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

  let argumentArrayForEdit =
    diffArgumentArrForRun
    |> Js.Array.reduce(
         (arr, {arguments, type_}) => {
           let diffValue =
             StateEditorService.getState()
             |> SceneEditorService.unsafeGetDiffMap
             |> DiffComponentService.getEditEngineComponent(type_);
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
  WonderLog.Log.print(("argu run", argumentArrayForRun)) |> ignore;
  WonderLog.Log.print(("argu edit", argumentArrayForEdit)) |> ignore;
  let handleFunc = Obj.magic(handleFunc);
  let handleFuncForRun =
    argumentArrayForRun
    |> Obj.magic
    |> Js.Array.reduce(
         (handleFunc, component) => handleFunc(component) |> Obj.magic,
         handleFunc,
       );
  let handleFuncForEdit =
    argumentArrayForEdit
    |> Obj.magic
    |> Js.Array.reduce(
         (handleFunc, component) => handleFunc(component) |> Obj.magic,
         handleFunc,
       );

  getRunEngineState()
  |> handleFuncForRun
  |> DirectorEngineService.loopBody(0.)
  |> setRunEngineState;
  getEditEngineState()
  |> handleFuncForEdit
  |> DirectorEngineService.loopBody(0.)
  |> setEditEngineState;
};

let getEditorState = handleFunc => StateEditorService.getState() |> handleFunc;

let getAndSetEditorState = handleFunc =>
  StateEditorService.getState()
  |> handleFunc
  |> StateEditorService.setState
  |> ignore;

let getStateToGetData = handleFunc =>
  (StateEditorService.getState(), getRunEngineState()) |> handleFunc;