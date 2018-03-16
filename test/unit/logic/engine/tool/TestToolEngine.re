open Wonderjs;

open Sinon;

open DomToolEngine;

let initWithoutBuildFakeDom =
    (
      ~sandbox,
      ~isDebug=Js.Nullable.return(Js.true_),
      ~bufferConfig=Js.Nullable.return({"geometryPointDataBufferCount": Js.Nullable.return(300)}),
      ()
    ) => {
  Random.init(1);
  Main.setMainConfig(MainToolEngine.buildMainConfig(~isDebug, ~bufferConfig, ()))
  |> (
    (state) => {
      MainStateData.stateData.state = Some(state);
      state
    }
  )
};

let init =
    (
      ~sandbox,
      ~isDebug=Js.Nullable.return(Js.true_),
      ~bufferConfig=Js.Nullable.return({"geometryPointDataBufferCount": Js.Nullable.return(300)}),
      ()
    ) => {
  MainToolEngine.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithoutBuildFakeDom(~sandbox, ~isDebug, ~bufferConfig, ())
};

let prepareTime = () => TimeControllerToolEngine.setStartTime(0.);

let prepare = (sandbox) => {
  prepareTime();
  MainToolEngine.buildFakeDomForPassCanvasId(sandbox) |> ignore
};