let unsafeGetScene = () =>
  SceneEngineService.getSceneGameObject
  |> StateLogicService.getEngineStateToGetData;

let getSceneCameras = () => {
  let engineState = StateEngineService.unsafeGetState();

  engineState
  |> GameObjectEngineService.getAllGameObjects(
       engineState |> SceneEngineService.getSceneGameObject,
     )
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasBasicCameraViewComponent(
         gameObject,
         engineState,
       )
     );
};

let getSceneFirstCamera = () =>
  getSceneCameras() |> ArrayService.unsafeGetFirst;

let getSceneSecondCamera = () =>
  getSceneCameras() |> ArrayService.unsafeGetNth(1);

let setSceneFirstCameraToBeCurrentSceneTreeNode = () =>
  getSceneFirstCamera() |> GameObjectTool.setCurrentSceneTreeNode;

let setSceneSecondCameraToBeCurrentSceneTreeNode = () =>
  getSceneSecondCamera() |> GameObjectTool.setCurrentSceneTreeNode;

let _isBox = (gameObject, engineState) =>
  GameObjectComponentEngineService.hasGeometryComponent(
    gameObject,
    engineState,
  )
  && GeometryEngineService.getGeometryVertices(
       GameObjectComponentEngineService.unsafeGetGeometryComponent(
         gameObject,
         engineState,
       ),
       engineState,
     )
  |> Js.Typed_array.Float32Array.length === 72;

let getBoxByIndex = (index, engineState) =>
  engineState
  |> GameObjectUtils.getChildren(unsafeGetScene())
  |> Js.Array.filter(gameObject => _isBox(gameObject, engineState))
  |> ArrayService.unsafeGetNth(index);

let getDirectionLightGameObjectByIndex = (index, engineState) =>
  engineState
  |> GameObjectUtils.getChildren(unsafeGetScene())
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasDirectionLightComponent(
         gameObject,
         engineState,
       )
     )
  |> ArrayService.unsafeGetNth(index);

let getFirstBox = engineState => getBoxByIndex(0, engineState);

let getSecondBox = engineState => getBoxByIndex(1, engineState);

let setFirstBoxToBeCurrentSceneTreeNode = () =>
  getFirstBox(StateEngineService.unsafeGetState())
  |> GameObjectTool.setCurrentSceneTreeNode;

let setSecondBoxToBeCurrentSceneTreeNode = () =>
  getSecondBox(StateEngineService.unsafeGetState())
  |> GameObjectTool.setCurrentSceneTreeNode;

let setDirectionLightGameObjectToBeCurrentSceneTreeNode = () =>
  getDirectionLightGameObjectByIndex(0, StateEngineService.unsafeGetState())
  |> GameObjectTool.setCurrentSceneTreeNode;

let initStateWithJob =
    (
      ~sandbox,
      ~noWorkerJobRecord,
      ~buffer=SettingToolEngine.buildBufferConfigStr(),
      ~isBuildFakeDom=true,
      ~isInitJob=true,
      (),
    ) => {
  TestTool.initEditorAndEngineStateAndInitSceneWithJob(
    ~sandbox,
    ~buffer,
    ~noWorkerJobRecord,
    ~isBuildFakeDom,
    ~isInitJob,
    (),
  );
  TestTool.openContractCheck();
  TestToolEngine.openContractCheck();
  AllMaterialToolEngine.prepareForInit();

  SettingToolEngine.setFakeCanvasToEngineState();

  StateEditorService.setState(CreateEditorStateEditorService.create())
  |> ignore;
};

let initState =
    (~sandbox, ~buffer=SettingToolEngine.buildBufferConfigStr(), ()) =>
  initStateWithJob(
    ~sandbox,
    ~noWorkerJobRecord=
      NoWorkerJobConfigToolEngine.buildNoWorkerEmptyJobConfig(),
    ~buffer,
    (),
  );

let createDefaultSceneAndNotInit = sandbox => {
  let engineState =
    InitEditorJobUtils.initEditorJob(
      [||],
      StateEngineService.unsafeGetState(),
    );

  engineState
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateEngineService.setState
  |> ignore;
};

let createDefaultScene = (sandbox, initFunc) => {
  createDefaultSceneAndNotInit(sandbox);

  initFunc();
};

let getCameraInDefaultScene = engineState =>
  GameObjectUtils.getChildren(unsafeGetScene(), engineState)
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasBasicCameraViewComponent(
         gameObject,
         engineState,
       )
     )
  |> WonderCommonlib.ArrayService.unsafePop;

let _isDirectionLight = (gameObject, engineState) =>
  LightEngineService.hasLightComponent(gameObject, engineState);

let getBoxInDefaultScene = engineState =>
  GameObjectUtils.getChildren(unsafeGetScene(), engineState)
  |> Js.Array.filter(gameObject => _isBox(gameObject, engineState))
  |> WonderCommonlib.ArrayService.unsafePop;

let getDirectionLightInDefaultScene = engineState =>
  GameObjectUtils.getChildren(unsafeGetScene(), engineState)
  |> Js.Array.filter(gameObject =>
       _isDirectionLight(gameObject, engineState)
     )
  |> ArrayService.unsafeGetFirst;