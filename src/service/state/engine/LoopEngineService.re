let loopSetState = (time, engineState) => engineState |> DirectorEngineService.loopBody(time);

let loop = () => {
  let rec _loopRequest = (time) =>
    DomHelper.requestAnimationFrame(
      (time) => {
        loopSetState(time) |> StateLogicService.getAndSetEngineState;
        _loopRequest(time) |> ignore
      }
    );
  _loopRequest(0.) |> ignore
};