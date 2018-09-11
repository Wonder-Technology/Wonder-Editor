let unsafeGetScene = () =>
  SceneEngineService.getSceneGameObject
  |> StateLogicService.getEngineStateToGetData;

let setFirstCameraTobeCurrentSceneTreeNode = () => {
  let engineState = StateLogicService.getRunEngineState();

  engineState
  |> GameObjectComponentEngineService.getAllBasicCameraViewComponents
  |> Js.Array.map(component =>
       engineState
       |> BasicCameraViewEngineService.getBasicCameraViewGameObject(component)
     )
  |> ArrayService.unsafeGetFirst
  |> GameObjectTool.setCurrentSceneTreeNode;
};

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

/* let setFirstBoxTobeCurrentSceneTreeNode = () =>
   getBoxByIndex(0, StateLogicService.getRunEngineState())
   |> GameObjectTool.setCurrentSceneTreeNode; */

let setFirstBoxTobeCurrentSceneTreeNode = () =>
  getBoxByIndex(0, StateEngineService.unsafeGetState())
  |> GameObjectTool.setCurrentSceneTreeNode;

let setDirectionLightGameObjectTobeCurrentSceneTreeNode = () =>
  getDirectionLightGameObjectByIndex(0, StateLogicService.getRunEngineState())
  |> GameObjectTool.setCurrentSceneTreeNode;

let initStateWithJob =
    (
      ~sandbox,
      ~noWorkerJobRecord,
      ~buffer=SettingToolEngine.buildBufferConfigStr(),
      ~isBuildFakeDom=true,
      (),
    ) => {
  TestTool.initEditorAndEngineStateAndInitSceneWithJob(
    ~sandbox,
    ~buffer,
    ~noWorkerJobRecord,
    ~isBuildFakeDom,
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
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();
  let (editorState, engineState, editCamera) =
    engineState
    |> DefaultSceneUtils.prepareSpecificGameObjectsForEngineState(editorState);

  let (engineState, cubeGeometry) =
    engineState |> DefaultSceneUtils.prepareDefaultComponentForEngineState;
  let (engineState, sceneCamera) =
    engineState
    |> DefaultSceneUtils.createDefaultSceneForEngineState(cubeGeometry);

  let editorState =
    editorState
    |> GameViewEditorService.setActivedBasicCameraView(
         GameObjectComponentEngineService.getBasicCameraViewComponent(
           sceneCamera,
           engineState,
         ),
       );

  /* let editorState = DefaultSceneUtils.computeDiffValue(editorState); */

  editorState |> StateEditorService.setState |> ignore;

  engineState
  /* |> PerspectiveCameraProjectionToolEngine.setAllCameraProjectionsDefaultAspect */
  |> GameObjectComponentEngineService.getBasicCameraViewComponent(editCamera)
  |. BasicCameraViewEngineService.activeBasicCameraView(engineState)
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

let getGridPlaneInDefaultScene = editorState =>
  SceneViewEditorService.unsafeGetGridPlane(editorState);