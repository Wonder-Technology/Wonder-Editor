let getEngineState = (handleFunc) => StateEngineService.getState() |> handleFunc;

let getAndSetEngineState = (handleFunc) =>
  StateEngineService.getState() |> handleFunc |> StateEngineService.setState |> ignore;

let getEditorState = (handleFunc) => StateEditorService.getState() |> handleFunc;

let getAndSetEditorState = (handleFunc) =>
  StateEditorService.getState() |> handleFunc |> StateEditorService.setState |> ignore;

let _prepareState = () => (StateEditorService.getState(), StateEngineService.getState());

let _finishState = ((editorState, engineState)) => {
  StateEditorService.setState(editorState) |> ignore;
  StateEngineService.setState(engineState) |> ignore;
  ()
};

let getState = (handleFunc) => _prepareState() |> handleFunc;

let setState = (stateTuple) => stateTuple |> _finishState;

let getAndSetState = (handleFunc) => _prepareState() |> handleFunc |> _finishState;