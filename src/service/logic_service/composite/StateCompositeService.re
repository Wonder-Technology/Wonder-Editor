let prepareState = () => (EditorStateLogicService.getState(), EngineStateLogicService.getState());

let finishState = ((editorState, engineState)) => {
  EditorStateLogicService.setState(editorState) |> ignore;
  EngineStateLogicService.setState(engineState) |> ignore;
  ()
};

let getState = (handleFunc) => prepareState() |> handleFunc;

let setState = (stateTuple) => stateTuple |> finishState;

let getAndSetState = (handleFunc) => prepareState() |> handleFunc |> finishState;