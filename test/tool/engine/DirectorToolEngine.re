open Wonderjs;

let prepare = (engineState: StateDataMainType.state) => {
  TimeControllerToolEngine.setStartTime(0.);
  engineState;
};

let init = (engineState: StateDataMainType.state) =>
  engineState |> DirectorMainService._noWorkerInit;

let run = (engineState: StateDataMainType.state, ~time=0., ()) =>
  engineState |> DirectorMainService._run(time);

let runWithDefaultTime = (engineState: StateDataMainType.state) =>
  engineState |> DirectorMainService._run(0.);

let runWithDefaultTimeEngineState = () =>
  StateEngineService.unsafeGetState()
  |> DirectorMainService._run(0.)
  |> StateEngineService.setState
  |> ignore;

let prepareAllEnginState = () =>
  StateEngineService.unsafeGetState()
  |> prepare
  |> StateEngineService.setState
  |> ignore;

let initAllEnginState = () =>
  StateEngineService.unsafeGetState()
  |> init
  |> StateEngineService.setState
  |> ignore;

let prepareAndInitAllEnginState = () => {
  prepareAllEnginState();
  initAllEnginState();
};