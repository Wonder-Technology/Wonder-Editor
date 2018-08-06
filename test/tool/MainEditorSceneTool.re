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
  |> ArrayService.getFirst
  |> GameObjectTool.setCurrentSceneTreeNode;
};

let _isBox = (gameObject, engineState) =>
  GameObjectComponentEngineService.hasGeometryComponent(
    gameObject,
    engineState,
  )
  && GeometryEngineService.getGeometryVertices(
       GameObjectComponentEngineService.getGeometryComponent(
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
  |> ArrayService.getNth(index);

let getDirectionLightGameObjectByIndex = (index, engineState) =>
  engineState
  |> GameObjectUtils.getChildren(unsafeGetScene())
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasDirectionLightComponent(
         gameObject,
         engineState,
       )
     )
  |> ArrayService.getNth(index);

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
      (),
    ) => {
  TestTool.initEditorAndEngineStateAndInitSceneWithJob(
    ~sandbox,
    ~buffer,
    ~noWorkerJobRecord,
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
  let (_editorStateForComponent, editEngineState, editCamera) =
    editEngineState
    |> DefaultSceneUtils.prepareSpecificGameObjectsForEditEngineState(None);
  let (_editorStateForComponent, editEngineState) =
    editEngineState |> DefaultSceneUtils.createDefaultScene(None);
  let (editorState, editEngineState) =
    editEngineState |> DefaultSceneUtils.computeDiffValue(editorState);

  editorState |> StateEditorService.setState |> ignore;

  editEngineState
  |> GameObjectComponentEngineService.getBasicCameraViewComponent(editCamera)
  |. BasicCameraViewEngineService.activeBasicCameraView(editEngineState)
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateLogicService.setEditEngineState;

  let editorState = StateEditorService.getState();
  let (editorStateForComponent, runEngineState) =
    StateLogicService.getRunEngineState()
    |> DefaultSceneUtils.createDefaultScene(editorState |. Some);

  switch (editorStateForComponent) {
  | None => editorState |> StateEditorService.setState |> ignore
  | Some(editorState) => editorState |> StateEditorService.setState |> ignore
  };

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
  |> ArrayService.getFirst;

let getGridPlaneInDefaultScene = engineState =>
  GameObjectUtils.getChildren(unsafeGetScene(), engineState)
  |> Js.Array.filter(gameObject =>
       GameObjectEngineService.unsafeGetGameObjectName(
         gameObject,
         engineState,
       )
       === "gridPlane"
     )
  |> WonderCommonlib.ArrayService.unsafePop;