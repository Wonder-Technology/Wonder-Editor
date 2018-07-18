let loopSetState = (time, engineState) => engineState |> DirectorEngineService.loopBody(time);

let _loopSetLoopId = (id) =>
  LoopEditorService.setLoopId(id) |> StateLogicService.getAndSetEditorState;

let loop = () => {
  let rec _loopRequest = (time) =>
    AnimationFrameType.requestAnimationFrame(
      (time) => {
        loopSetState(time) |> StateLogicService.getAndSetEditAndRunEngineState;
        _loopRequest(time)
      }
    )
    |> _loopSetLoopId;
  _loopRequest(0.) |> ignore
};

let stopLoop = (loopId) => AnimationFrameType.cancelAnimationFrame(loopId);