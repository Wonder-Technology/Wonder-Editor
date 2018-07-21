open Wonderjs;

let initWithoutBuildFakeDom =
    (~sandbox, ~isDebug="true", ~buffer=SettingToolEngine.buildBufferConfigStr(), ()) => {
  Random.init(1);
  SettingToolEngine.createStateAndSetToStateData(~isDebug, ())
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
      ()
    ) => {
  [@bs] SharedArrayBufferToolEngine.setSharedArrayBufferToBeArrayBuffer();
  SettingToolEngine.createStateAndSetToStateData(
    ~isDebug,
    ~canvasId,
    ~context,
    ~useHardwareInstance,
    ~buffer,
    ()
  )
  |> NoWorkerJobConfigToolEngine.create(noWorkerJobRecord)
  |> NoWorkerJobToolEngine.init((
       NoWorkerJobHandleSystem.createInitJobHandleMap,
       NoWorkerJobHandleSystem.createLoopJobHandleMap
     ))
  |> RenderConfigToolEngine.create(renderConfigRecord)
};

let createAndSetEngineState =
    (
      ~sandbox,
      ~noWorkerJobRecord=NoWorkerJobConfigToolEngine.buildNoWorkerEmptyJobConfig(),
      ~buffer=SettingToolEngine.buildBufferConfigStr(),
      ()
    ) => {

  SettingToolEngine.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithJobConfigWithoutBuildFakeDom(~sandbox, ~noWorkerJobRecord, ~buffer, ())
  |> StateLogicService.setEditEngineState;

  initWithJobConfigWithoutBuildFakeDom(~sandbox, ~noWorkerJobRecord, ~buffer, ())
  |> StateLogicService.setRunEngineState
};

let initEngineState = () => {
  StateLogicService.getEditEngineState()
  |> DirectorEngineService.init
  |> StateLogicService.setEditEngineState;
  StateLogicService.getRunEngineState()
  |> DirectorEngineService.init
  |> StateLogicService.setRunEngineState
};

let setFakeGl = (sandbox) => {
  StateLogicService.getEditEngineState()
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateLogicService.setEditEngineState;
  StateLogicService.getRunEngineState()
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateLogicService.setRunEngineState
};

let openContractCheck = () =>
  IsDebugMainService.setIsDebug(StateDataMain.stateData, true) |> ignore;

let closeContractCheck = () =>
  IsDebugMainService.setIsDebug(StateDataMain.stateData, false) |> ignore;