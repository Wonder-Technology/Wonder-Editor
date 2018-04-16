let loopSetState = (time, engineState) => engineState |> DirectorEngineService.loopBody(time);

let _loopSetLoopId = (id) =>
  LoopEditorService.setLoopId(id) |> StateLogicService.getAndSetEditorState;

let loop = () => {
  let rec _loopRequest = (time) =>
    DomHelper.requestAnimationFrame(
      (time) => {
        WonderLog.Log.print("fck") |> ignore;
        loopSetState(time) |> StateLogicService.getAndSetEditAndRunEngineState;
        _loopRequest(time) |> _loopSetLoopId
      }
    );
  _loopRequest(0.) |> _loopSetLoopId
};

let stopLoop = (loopId) => DomHelper.cancelAnimationFrame(loopId);