open Wonderjs;

open Sinon;

open DomToolEngine;

let initWithoutBuildFakeDom =
    (
      ~sandbox,
      ~isTest=Js.Nullable.return(Js.true_),
      ~bufferConfig=Js.Nullable.return({"geometryPointDataBufferCount": Js.Nullable.return(300)}),
      ()
    ) => {
  Random.init(1);
  Main.setMainConfig(MainToolEngine.buildMainConfig(~isTest, ~bufferConfig, ()))
  |> (
    (state) => {
      StateData.stateData.state = Some(state);
      state
    }
  )
};

let init =
    (
      ~sandbox,
      ~isTest=Js.Nullable.return(Js.true_),
      ~bufferConfig=Js.Nullable.return({"geometryPointDataBufferCount": Js.Nullable.return(300)}),
      ()
    ) => {
  MainToolEngine.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithoutBuildFakeDom(~sandbox, ~isTest, ~bufferConfig, ())
};

let prepareTime = () => TimeControllerToolEngine.setStartTime(0.);

let prepare = (sandbox) => {
  prepareTime();
  MainToolEngine.buildFakeDomForPassCanvasId(sandbox) |> ignore
};