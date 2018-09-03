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

let setFirstBoxTobeCurrentSceneTreeNode = () =>
  getBoxByIndex(0, StateLogicService.getRunEngineState())
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

let createDefaultScene = (sandbox, initFunc) => {
  let editorState = StateEditorService.getState();
  let editEngineState = StateLogicService.getEditEngineState();
  let (editorState, editEngineState, editCamera) =
    editEngineState
    |> DefaultSceneUtils.prepareSpecificGameObjectsForEditEngineState(
         editorState,
       );

  let (editEngineState, cubeGeometry) =
    editEngineState
    |> DefaultSceneUtils.prepareDefaultComponentForEditEngineState;
  let editEngineState =
    editEngineState
    |> DefaultSceneUtils.createDefaultSceneForEditEngineState(cubeGeometry);
  let editorState = DefaultSceneUtils.computeDiffValue(editorState);

  editorState |> StateEditorService.setState |> ignore;

  editEngineState
  |> GameObjectComponentEngineService.getBasicCameraViewComponent(editCamera)
  |. BasicCameraViewEngineService.activeBasicCameraView(editEngineState)
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateLogicService.setEditEngineState;

  let editorState = StateEditorService.getState();

  let (editorState, runEngineState, cubeGeometry) =
    DefaultSceneUtils.prepareDefaultComponentForRunEngineState(
      editorState,
      StateLogicService.getRunEngineState(),
    );
  let (editorState, runEngineState) =
    runEngineState
    |> DefaultSceneUtils.createDefaultSceneForRunEngineState(
         cubeGeometry,
         editorState,
       );

  editorState |> StateEditorService.setState |> ignore;

  runEngineState
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateLogicService.setRunEngineState;

  initFunc();
};

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

let getGridPlaneInDefaultScene = editorState => GameObjectEditorService.unsafeGetGridPlane(editorState);