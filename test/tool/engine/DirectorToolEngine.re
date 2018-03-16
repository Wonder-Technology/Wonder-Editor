open Wonderjs;

let prepare = (state: MainStateDataType.state) => {
  TimeControllerToolEngine.setStartTime(0.);
  state
};

let init = (state: MainStateDataType.state) => state |> DirectorSystem._noWorkerInit;

let run = (state: MainStateDataType.state, ~time=0., ()) => state |> DirectorSystem._run(time);

let runWithDefaultTime = (state: MainStateDataType.state) => state |> DirectorSystem._run(0.);