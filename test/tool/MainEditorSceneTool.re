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

let _isCube = (gameObject, engineState) =>
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

let getCubeByIndex = (index, engineState) =>
  engineState
  |> GameObjectUtils.getChildren(unsafeGetScene())
  |> Js.Array.filter(gameObject => _isCube(gameObject, engineState))
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

let getFirstCube = engineState => getCubeByIndex(0, engineState);

let getSecondCube = engineState => getCubeByIndex(1, engineState);

let setFirstCubeToBeCurrentSceneTreeNode = () =>
  getFirstCube(StateEngineService.unsafeGetState())
  |> GameObjectTool.setCurrentSceneTreeNode;

let setSecondCubeToBeCurrentSceneTreeNode = () =>
  getSecondCube(StateEngineService.unsafeGetState())
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

  StateEditorService.setState(
    CreateEditorStateEditorService.create()
    |> SettingTool.initSetting
    |> TreeAssetEditorService.createTree,
  )
  |> ignore;

  ConsoleTool.notShowMessage();
};

let initState =
    (
      ~sandbox,
      ~isBuildFakeDom=true,
      ~buffer=SettingToolEngine.buildBufferConfigStr(),
      (),
    ) =>
  initStateWithJob(
    ~sandbox,
    ~noWorkerJobRecord=
      NoWorkerJobConfigToolEngine.buildNoWorkerEmptyJobConfig(),
    ~isBuildFakeDom,
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

let createDefaultComponents = () => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let (editorState, engineState, cubeGeometry) =
    DefaultSceneUtils.prepareDefaultComponent(editorState, engineState);

  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;
};

let prepareScene = sandbox => {
  createDefaultComponents();

  let engineState = StateEngineService.unsafeGetState();
  engineState
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateEngineService.setState
  |> ignore;

  MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
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

let getCubeInDefaultScene = engineState =>
  GameObjectUtils.getChildren(unsafeGetScene(), engineState)
  |> Js.Array.filter(gameObject => _isCube(gameObject, engineState))
  |> WonderCommonlib.ArrayService.unsafePop;

let getDirectionLightInDefaultScene = engineState =>
  GameObjectUtils.getChildren(unsafeGetScene(), engineState)
  |> Js.Array.filter(gameObject =>
       _isDirectionLight(gameObject, engineState)
     )
  |> ArrayService.unsafeGetFirst;

let getDefaultGameObjects = engineState => {
  let scene = unsafeGetScene();
  (
    scene,
    (
      getCameraInDefaultScene(engineState),
      getFirstCube(engineState),
      getSecondCube(engineState),
      getDirectionLightInDefaultScene(engineState),
    ),
  );
};