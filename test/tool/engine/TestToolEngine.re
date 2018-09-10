open Wonderjs;

let initWithoutBuildFakeDom =
    (
      ~sandbox,
      ~isDebug="true",
      ~buffer=SettingToolEngine.buildBufferConfigStr(),
      (),
    ) => {
  Random.init(1);
  SettingToolEngine.createStateAndSetToStateData(~isDebug, ());
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
      ~buffer=SettingToolEngine.buildBufferConfigStr(),
      ~noWorkerJobRecord=NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
      ~renderConfigRecord=RenderConfigToolEngine.buildRenderConfig(),
      (),
    ) => {
  SharedArrayBufferToolEngine.setSharedArrayBufferToBeArrayBuffer(.);
  SettingToolEngine.createStateAndSetToStateData(
    ~isDebug,
    ~canvasId,
    ~context,
    ~useHardwareInstance,
    ~buffer,
    (),
  )
  |> NoWorkerJobConfigToolEngine.create(noWorkerJobRecord)
  /* |> NoWorkerJobToolEngine.init((
       NoWorkerJobHandleSystem.createInitJobHandleMap,
       NoWorkerJobHandleSystem.createLoopJobHandleMap,
     )) */
  |> RenderConfigToolEngine.create(renderConfigRecord);
};

let createAndSetEngineState =
    (
      ~sandbox,
      ~noWorkerJobRecord=NoWorkerJobConfigToolEngine.buildNoWorkerEmptyJobConfig(),
      ~buffer=SettingToolEngine.buildBufferConfigStr(),
      ~isBuildFakeDom=true,
      (),
    ) => {
  isBuildFakeDom ?
    SettingToolEngine.buildFakeDomForNotPassCanvasId(sandbox) |> ignore : ();

  initWithJobConfigWithoutBuildFakeDom(
    ~sandbox,
    ~noWorkerJobRecord,
    ~buffer,
    (),
  )
  |> StateEngineService.setState
  |> ignore;
  /* initWithJobConfigWithoutBuildFakeDom(
       ~sandbox,
       ~noWorkerJobRecord,
       ~buffer,
       (),
     )
     |> StateLogicService.setRunEngineState; */
};

let initEngineState = () =>
  StateEngineService.unsafeGetState()
  |> DirectorEngineService.init
  |> StateEngineService.setState
  |> ignore;
/* StateLogicService.getRunEngineState()
   |> DirectorEngineService.init
   |> StateLogicService.setRunEngineState; */

let setFakeGl = (gl, engineState) =>
  engineState |> FakeGlToolEngine.setFakeGl(gl);

let openContractCheck = () =>
  IsDebugMainService.setIsDebug(StateDataMain.stateData, true) |> ignore;

let closeContractCheck = () =>
  IsDebugMainService.setIsDebug(StateDataMain.stateData, false) |> ignore;