let prepareState = () => (EditorStateLogicSingleService.getState(), EngineStateLogicSingleService.getState());

let finishState = ((editorState, engineState)) => {
  EditorStateLogicSingleService.setState(editorState) |> ignore;
  EngineStateLogicSingleService.setState(engineState) |> ignore;
  ()
};

let getState = (handleFunc) => prepareState() |> handleFunc;

let setState = (stateTuple) => stateTuple |> finishState;

let getAndSetState = (handleFunc) => prepareState() |> handleFunc |> finishState;