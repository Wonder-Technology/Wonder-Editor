let unsafeGetScene = () =>
  SceneEngineService.getSceneGameObject
  |> StateLogicService.getEngineStateToGetData;

let setCameraTobeCurrentSceneTreeNode = () =>
  unsafeGetScene()
  |> GameObjectTool.getChildren
  |> Js.Array.filter(gameObject =>
       CameraEngineService.isCamera(gameObject)
       |> StateLogicService.getEngineStateToGetData
     )
  |> ArrayService.getFirst
  |> GameObjectTool.setCurrentSceneTreeNode;

let getBoxByIndex = (index, engineState) =>
  engineState
  |> GameObjectUtils.getChildren(unsafeGetScene())
  |> Js.Array.filter(gameObject =>
       ! CameraEngineService.isCamera(gameObject, engineState)
     )
  |> ArrayService.getNth(index);

let setFirstBoxTobeCurrentSceneTreeNode = () =>
  getBoxByIndex(0, StateLogicService.getRunEngineState())
  |> GameObjectTool.setCurrentSceneTreeNode;

let setDirectionLightGameObjectTobeCurrentSceneTreeNode = () =>
  getBoxByIndex(2, StateLogicService.getRunEngineState())
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
  let (_editorStateForComponent, editEngineState, box) =
    editEngineState
    |> DefaultSceneUtils.prepareSpecificGameObjectsForEditEngineState(None);
  let (_editorStateForComponent, editEngineState, camera) =
    editEngineState |> DefaultSceneUtils.createDefaultScene(None);
  let (editorState, editEngineState) =
    editEngineState |> DefaultSceneUtils.computeDiffValue(editorState);

  editorState |> StateEditorService.setState |> ignore;
  editEngineState
  |> GameObjectUtils.setParentKeepOrder(camera, box)
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateLogicService.setEditEngineState;

  let editorState = StateEditorService.getState();
  let (editorStateForComponent, runEngineState, _) =
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

let _isBox = (gameObject, engineState) =>
  GameObjectComponentEngineService.hasBoxGeometryComponent(
    gameObject,
    engineState,
  );

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