/* open Wonderjs;

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
   }; */
open Wonderjs;

let initWithoutBuildFakeDom =
    (
      ~sandbox,
      ~isDebug="true",
      ~bufferConfig={"geometryPointDataBufferCount": Js.Nullable.return(300)},
      ()
    ) => {
  Random.init(1);
  SettingToolEngine.createStateAndSetToStateData(~isDebug, ())
};

let init =
    (
      ~sandbox,
      ~isDebug="true",
      ~bufferConfig={"geometryPointDataBufferCount": Js.Nullable.return(300)},
      ()
    ) => {
  SettingToolEngine.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithoutBuildFakeDom(~sandbox, ~isDebug, ~bufferConfig, ())
};

let initWithJobConfigWithoutBuildFakeDom =
    (
      ~sandbox,
      ~isDebug="true",
      ~canvasId=None,
      ~context={|
        {
        "alpha": true,
        "depth": true,
        "stencil": false,
        "antialias": true,
        "premultiplied_alpha": true,
        "preserve_drawing_buffer": false
        }
               |},
      ~useHardwareInstance="true",
      ~bufferConfig={"geometryPointDataBufferCount": Js.Nullable.return(5)},
      ~noWorkerJobRecord=NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
      ~renderConfigRecord=RenderConfigToolEngine.buildRenderConfig(),
      ()
    ) =>
  SettingToolEngine.createStateAndSetToStateData(
    ~isDebug,
    ~canvasId,
    ~context,
    ~useHardwareInstance,
    ()
  )
  |> NoWorkerJobConfigToolEngine.create(noWorkerJobRecord)
  |> NoWorkerJobToolEngine.init
  |> RenderConfigToolEngine.create(renderConfigRecord);

let createAndSetEngineState = (~sandbox, ~noWorkerJobRecord=NoWorkerJobConfigToolEngine.buildNoWorkerEmptyJobConfig(), ()) => {
  SettingToolEngine.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithJobConfigWithoutBuildFakeDom(
    ~sandbox,
    ~noWorkerJobRecord,
    ()
  )
  |> StateLogicService.setEngineStateForEdit;
  initWithJobConfigWithoutBuildFakeDom(
    ~sandbox,
    ~noWorkerJobRecord,
    ()
  )
  |> StateLogicService.setEngineStateForRun
};

/* let initWithJobConfig =
       (
         ~sandbox,
         ~isDebug="true",
         ~bufferConfig={"geometryPointDataBufferCount": Js.Nullable.return(5)},
         ~noWorkerJobRecord=NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
         ~renderConfigRecord=RenderConfigToolEngine.buildRenderConfig(),
         ()
       ) => {
     SettingToolEngine.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
     initWithJobConfigWithoutBuildFakeDom(~sandbox, ~isDebug, ~bufferConfig, ~noWorkerJobRecord, ())
   }; */
let openContractCheck = () =>
  IsDebugMainService.setIsDebug(MainStateData.stateData, true) |> ignore;

let closeContractCheck = () =>
  IsDebugMainService.setIsDebug(MainStateData.stateData, false) |> ignore;