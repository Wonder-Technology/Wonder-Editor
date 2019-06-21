open Wonderjs;

let getDefaultContext = () => {|
        {
        "alpha": true,
        "depth": true,
        "stencil": false,
        "antialias": true,
        "premultiplied_alpha": true,
        "preserve_drawing_buffer": false
        }
               |};

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
      ~noWorkerJobRecord=NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
      ~renderConfigRecord=RenderConfigToolEngine.buildRenderConfig(),
      ~isInitJob=true,
      ~engineState,
      (),
    ) => {
  SharedArrayBufferToolEngine.setSharedArrayBufferToBeArrayBuffer(.);

  engineState
  |> NoWorkerJobConfigToolEngine.create(noWorkerJobRecord)
  |> (
    state =>
      isInitJob ?
        state
        |> NoWorkerJobToolEngine.init((
             NoWorkerJobHandleSystem.createInitJobHandleMap,
             NoWorkerJobHandleSystem.createLoopJobHandleMap,
           ))
        |> RenderConfigToolEngine.create(renderConfigRecord) :
        state |> RenderConfigToolEngine.create(renderConfigRecord)
  );
};

let createAndSetEngineState =
    (
      ~sandbox,
      ~noWorkerJobRecord=NoWorkerJobConfigToolEngine.buildNoWorkerEmptyJobConfig(),
      ~isBuildFakeDom=true,
      ~isInitJob=true,
      ~isDebug="true",
      ~canvasId=None,
      ~context=getDefaultContext(),
      ~useHardwareInstance="true",
      ~buffer=SettingToolEngine.buildBufferConfigStr(),
      (),
    ) => {
  isBuildFakeDom ?
    SettingToolEngine.buildFakeDomForNotPassCanvasId(sandbox) |> ignore : ();

  initWithJobConfigWithoutBuildFakeDom(
    ~sandbox,
    ~noWorkerJobRecord,
    ~isInitJob,
    ~engineState=
      SettingToolEngine.createStateAndSetToStateData(
        ~isDebug,
        ~canvasId,
        ~context,
        ~useHardwareInstance,
        ~buffer,
        (),
      ),
    (),
  )
  |> GPUDetectToolEngine.setMaxTextureUnit(16)
  |> StateEngineService.setState
  |> ignore;
};

let createAndSetInspectorEngineState =
    (
      ~sandbox,
      ~noWorkerJobRecord=NoWorkerJobConfigToolEngine.buildNoWorkerEmptyJobConfig(),
      ~buffer=SettingToolEngine.buildBufferConfigStr(),
      ~isInitJob=true,
      ~context=getDefaultContext(),
      ~isDebug="true",
      ~canvasId=None,
      ~useHardwareInstance="true",
      (),
    ) =>
  initWithJobConfigWithoutBuildFakeDom(
    ~sandbox,
    ~noWorkerJobRecord,
    ~isInitJob,
    ~engineState=
      SettingToolEngine.createStateAndSetToInspectorStateData(
        ~isDebug,
        ~canvasId,
        ~context,
        ~useHardwareInstance,
        ~buffer,
        (),
      ),
    (),
  )
  |> StateInspectorEngineService.setState
  |> ignore;

let initEngineState = () =>
  StateEngineService.unsafeGetState()
  |> DirectorEngineService.init
  |> StateEngineService.setState
  |> ignore;

let setFakeGl = (gl, engineState) =>
  engineState |> FakeGlToolEngine.setFakeGl(gl);

let openContractCheck = () =>
  IsDebugMainService.setIsDebug(StateDataMain.stateData, true) |> ignore;

let closeContractCheck = () =>
  IsDebugMainService.setIsDebug(StateDataMain.stateData, false) |> ignore;